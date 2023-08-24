import React, {
  useRef,
  createContext,
  useContext,
  useState
} from "react";

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  let recognition = null;

  let animationFrameId;
  let notVoice = 0;
  let withVoice = 0;

  const micAudio = useRef()
  const audioReceive = useRef()
  const audioLoader = useRef()
  const [base64StringStreamAudio, setBase64StrinStreamAudio] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recognitionTranscript, setRecognitionTranscript] = useState('');
  const [noSpeech, setNoSpeech] = useState(false);
  const [sumRecording, setSumRecording] = useState(0)
  const [recordingDone, setRecordingDone] = useState(false)


  if (window.SpeechRecognition || window.webkitSpeechRecognition) {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true


    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setRecognitionTranscript(transcript)

      if (transcript === 'speaker') {
        console.log('send socket to create initial voice with interaction Hi! How i can help you?')
      }

    };

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento de fala:', event.error);
      setNoSpeech(true)
    };

  }

  let recognitionStart = (recognitionParams) => {

    recognitionParams.lang = (navigator.language || navigator.userLanguage);
    recognitionParams.interimResults = true;
    recognitionParams.start();
  }

  const resetBase64StringStreamAudio = async () => {
    notVoice = 0;
    withVoice = 0;

    setRecognitionTranscript('')
  }

  const stopRecording = (mediaRecorderParam) => {

    if (mediaRecorderParam && mediaRecorderParam.state === 'recording') {
      mediaRecorderParam.requestData();

      mediaRecorderParam.stop();
      recognition.stop()

      cancelAnimationFrame(animationFrameId);
      setRecordingDone(true)

    }
  };

  const analyzeFrequency = (mediaRecorderParam, analyserParam, frequencyDataParam) => {

    analyserParam.getByteFrequencyData(frequencyDataParam);

    const voiceThreshold = 161;

    const voiceDetected = frequencyDataParam.some((frequency) => frequency > voiceThreshold);

    const sumRecording = frequencyDataParam.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setSumRecording(sumRecording)

    if (voiceDetected) {
      withVoice = withVoice + 1;
      setNoSpeech(false)
    } else {
      notVoice = notVoice + 1;
    }

    if (withVoice > 10 && notVoice > 120) {
      withVoice = 0;
      notVoice = 0;

      if (mediaRecorderParam && mediaRecorderParam.state === 'recording') {
        stopRecording(mediaRecorderParam)
      }

    } else {
      animationFrameId = requestAnimationFrame(() => analyzeFrequency(mediaRecorderParam, analyserParam, frequencyDataParam));
    }
  }

  const startRecording = () => {
    setRecordingDone(false)

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
          audioBitsPerSecond: 32000,

          bufferSize: 4096,
        });

        setMediaRecorder(mediaRecorder);


        let audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);

        const audioSource = audioContext.createMediaStreamSource(stream);

        audioSource.connect(analyser);
        animationFrameId = requestAnimationFrame(() => analyzeFrequency(mediaRecorder, analyser, frequencyData));
        mediaRecorder.start();

      })
      .catch((error) => console.error(error));


    if (!recordingDone) {
      recognitionStart(recognition);
    }

  };

  const dataavailable = async (callback) => mediaRecorder.addEventListener('dataavailable', (event) => {

    const audioBlob = new Blob([event.data], { type: mediaRecorder.mimeType });
    const reader = new FileReader();

    reader.readAsDataURL(audioBlob);

    reader.onloadend = async () => {

      const BUFFER = reader.result.split(',')[1];

      if (typeof BUFFER === 'string' && recordingDone === true) {
        await callback(BUFFER)
      }

    };

  });

  const actionStop = async () => {
    setMediaRecorder(null)
    stopRecording(mediaRecorder)
    setSumRecording(0)
    await resetBase64StringStreamAudio()
  }

  const actionStart = async () => {
    startRecording()
    await resetBase64StringStreamAudio()
  }

  const actionPause = async () => {
    await resetBase64StringStreamAudio()
    audioReceive.current.pause();
    audioReceive.current.currentTime = 0;
  }

  return <AudioContext.Provider
    value={{
      setMediaRecorder,
      recognition,
      mediaRecorder,
      sumRecording,
      setSumRecording,
      noSpeech,
      micAudio,
      audioReceive,
      audioLoader,
      base64StringStreamAudio,
      recognitionTranscript,
      startRecording,
      stopRecording,
      resetBase64StringStreamAudio,
      setBase64StrinStreamAudio,
      recordingDone,
      dataavailable,
      actionStop,
      actionStart,
      actionPause
    }}>
    {children}
  </AudioContext.Provider>;
};

const useAudio = () => {
  const context = useContext(AudioContext);
  return context;
};

export { useAudio, AudioContext, AudioProvider };

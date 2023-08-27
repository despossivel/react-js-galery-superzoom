import React, { useEffect } from 'react';
import {
  useAudio,
  useWebSocket
} from "../lib/index.js"

const Content = () => {

  const {
    audioLoader,

    micAudio,
    audioReceive,

    resetBase64StringStreamAudio,

    // startRecording,
    // stopRecording,
    // mediaRecorder,
    // setMediaRecorder,
    // setSumRecording,

    // noSpeech,
    // recognitionTranscript,
    // sumRecording,
    // recordingDone,
    // dataavailable,


    // actionStop,
    // actionStart,
    // actionPause
  } = useAudio()


  const {
    socket,
    ONstarted,
    connectSocket,

    // upload,
    // ONtextTranscriptNotVoice,
    // ONtextTranscript,
    // ONtextResponse,
    // ONhistoricUpdate,
    // ONaudio,

    // disconnect,
    // ONtextSpeech,

  } = useWebSocket()



  // const SEND_START = async () => {
  //   await ONtextSpeech({
  //     voice: 'pt-BR-Standard-B',
  //     text: null

  //   })
  // }

  // useEffect(() => {
  //   if (noSpeech) {

  //     ONtextSpeech({
  //       voice: 'pt-BR-Standard-B',
  //       text: "Tente falar mais proximo do microfone e nitidamente."
  //     })

  //   }
  // }, [noSpeech])

  useEffect(() => {
    (async () => {
      try {

        // if (!initialized) return;

        // const userData = await keycloak.loadUserInfo()
        const socket = await connectSocket({ host: 'http://192.168.0.108:3000', sub: '341964aa-f385-4489-878a-6db0a8798901', token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6IC…Bi87QsfSvMK8SX6GJX2o5uGpo9oCgyoCOZ_1VsbCDUHsU4JYQ' })
 

        return () => socket.disconnect();

      } catch (e) {
        console.error(e)
      }
    })()
  }, [
    // initialized, keycloak, keycloak?.token
  ]);





  useEffect(() => {
    // try {

    ONstarted(async () => {
      await resetBase64StringStreamAudio()
      // audioLoad(audioLoader, 'assets/audios/junggle__btn402.wav')

    })

    // ONtextTranscriptNotVoice(async () => {

    //   // audioLoad(audioLoader, 'assets/audios/junggle__btn402.wav')
    //   startRecording()
    //   await resetBase64StringStreamAudio()

    //   console.log('ONtextTranscriptNotVoice: ', ONtextTranscriptNotVoice)

    // })

    // ONtextTranscript(async (text) => {
    //   console.log('ONtextTranscript: ', {
    //     msg: text,
    //     from: 'me'
    //   })
    // })

    // ONtextResponse((text) => {
    //   console.log('ONtextResponse: ', {
    //     msg: text,
    //     from: 'them'
    //   })
    // })

    // ONhistoricUpdate((data) => {
    //   console.log('ONHISTORICUPDATE: ', data.id)
    // })

    // ONaudio(async (data) => {

    //   await resetBase64StringStreamAudio()

    //   const blob = new Blob([data]);
    //   const audioUrlReceive = URL.createObjectURL(blob);
    //   audioReceive.current.src = audioUrlReceive;
    //   audioReceive.current.play();

    // })



    // disconnect(() => console.log('websocket disconnect'))

    // } catch (err) {
    //   console.error(err)
    // }
  }, [socket]);

  return <div>

    <audio ref={micAudio} controls id="micAudio"></audio>
    <audio ref={audioReceive} id="audioReceive" controls></audio>
    <audio ref={audioLoader} id="audioLoader" controls></audio>

    <h1>Hi</h1>
  </div>

};

export default Content;

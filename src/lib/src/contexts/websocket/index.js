import React, {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import socketIOClient from 'socket.io-client';


const WebSocketContext = createContext({
    isConnected: false,
    sendData: () => { }
});

const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const connectSocket = async ({ sub, token, host }) => {

        const socket = socketIOClient(host, {
            query: {
                token,
                sub
            },
        });

        setSocket(socket);
        return socket;

    }

    //mover para coreAI
    const upload = useCallback(async ({ voiceCurrent, modelAi, coreAiCurrent, interationID, base64StringStreamAudio, recognitionTranscript }) => {
        try {

            socket.emit('upload', {
                voice: voiceCurrent,
                modelAi,
                coreAi: coreAiCurrent,
                interationID,
                bytesAudio: base64StringStreamAudio,
                recognitionTranscript,

                LANGUAGE_CODE: (navigator.language || navigator.userLanguage)
            })
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os bytes do áudio:', error);
        }
    }, [socket])

    const uploadListener = useCallback((base64String) => {
        try {

            socket.emit('upload:listener', { bytesAudio: base64String, LANGUAGE_CODE: (navigator.language || navigator.userLanguage) })
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os bytes do áudio:', error);
        }
    }, [socket])

    const ONtextTranscriptNotVoice = async (callback) => socket.on('text:transcript:not:voice', callback)

    const ONtextTranscript = async (callback) => socket.on('text:transcript', callback)

    const ONtextResponse = async (callback) => socket.on('text:response', callback)

    const ONhistoricUpdate = async (callback) => socket.on('historic:update', callback)

    const ONaudio = async (callback) => socket.on('audio', callback)

    const ONstarted = async (callback) => socket.on('ONstarted', callback)

    const disconnect = async (callback) => socket.on('disconnect', callback)

    const ONtextSpeech = async ({ voice, text }) => socket.emit('text:speech', {
        voice,
        text,

        LANGUAGE_CODE: (navigator.language || navigator.userLanguage)
    })

    return <WebSocketContext.Provider value={{
        socket,
        upload,
        uploadListener,
        ONtextTranscriptNotVoice,
        ONtextTranscript,
        ONtextResponse,
        ONhistoricUpdate,
        ONaudio,
        ONstarted,
        disconnect,
        ONtextSpeech,
        connectSocket
    }} >
        {children}
    </WebSocketContext.Provider>;
};

const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    return context;
};

export { useWebSocket, WebSocketContext, WebSocketProvider };

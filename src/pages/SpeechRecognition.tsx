import React from 'react'
import Header from '../components/Header';
import { Button, Box } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const VoiceRecord = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div>
            <Header />
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <Box>{transcript}</Box>
            <Button onClick={() => SpeechRecognition.startListening}>Start</Button>
            <Button onClick={() => SpeechRecognition.stopListening}>Stop</Button>
        </div>
    )
};

export default VoiceRecord

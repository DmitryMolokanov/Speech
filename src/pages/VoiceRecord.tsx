import React, { useState } from 'react'
import Header from '../components/Header';
import { Button, Box } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const VoiceRecord = () => {
    const [value, setValue] = useState('I lov english')
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
            <Box width={360} height={300} sx={{ border: '2px solid' }}>{transcript}</Box>
            <Button onPointerDown={() => SpeechRecognition.startListening({ continuous: true, language: 'en-US' })}>Start</Button>
            <Button onPointerDown={() => SpeechRecognition.stopListening()}>Stop</Button>

            <textarea spellCheck lang='en' value={value}></textarea>
        </div>
    )
};

export default VoiceRecord

import React, { useEffect, useState } from "react";
import "./App.css";
import { IWord } from "./types";

function App() {
  const [arrWord, setArrWord] = useState(["box", "word", "live", "strong", "married", 'war', 'slice']);
  const [word, setWord] = useState("");
  const [wordAudio, setWordAudio] = useState("");
  const [definitions, setDefinitions] = useState('')

  const [mainInterval, setMainInterval] = useState<any>()
  const [isLoop, setIsLoop] = useState<boolean>(false)


  const getWord = () => {
    let index = 1;
    const interval = setInterval(async () => {
      // установка значения для очистка интервала
      setMainInterval(interval)
      // проверка, что индекс не больше массива
      if (index < arrWord.length) {
        // получение данных по API
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${arrWord[index]}`
        );
        const result: IWord[] = await response.json();
        console.log(result);
        // установить слово, которое будет отображено
        setWord(result[0].word);
        // проверить и установить озвучку слова
        if (result[0].phonetics[2]) {
          setWordAudio(result[0].phonetics[2].audio);
        } else setWordAudio(result[0].phonetics[1].audio);
        // следующая итерация
        const definition = result[0].meanings[0].definitions[0].definition
        setDefinitions(definition)
        setTimeout(() => {
          const speackDefinition = new SpeechSynthesisUtterance(definition)
          speackDefinition.lang = 'en-US'
          speechSynthesis.speak(speackDefinition)
        }, 1000)

        index++;
        if (index === arrWord.length && isLoop) {
          index = 1;
          stop()
          start()
        }
      }
    }, 1000);
  };

  const start = async () => {
    // тоже самое что getWord, только для установления дефолтного значения, чтобы не ждать первой итерации интервала. 
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${arrWord[0]}`
    );
    const result: IWord[] = await response.json();
    setWord(result[0].word);
    if (result[0].phonetics[2]) {
      setWordAudio(result[0].phonetics[2].audio);
    } else setWordAudio(result[0].phonetics[1].audio);
    const definition = result[0].meanings[0].definitions[0].definition
    setDefinitions(definition)
    setTimeout(() => {
      const speackDefinition = new SpeechSynthesisUtterance(definition)
      speackDefinition.lang = 'en-US'
      speechSynthesis.speak(speackDefinition)
    }, 500)
    getWord()

  }

  const stop = () => {
    clearInterval(mainInterval)
    speechSynthesis.cancel()

  }

  const restart = () => {
    speechSynthesis.cancel()
    stop()
    start()
  }

  const loop = () => {
    setIsLoop(true)
  }


  return (
    <div className="App">
      <h4>Word</h4>
      <div>{word}</div>
      <audio src={wordAudio} autoPlay />
      <h4>Definitions</h4>
      <div>{definitions}</div>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={restart}>restart</button>
      <button onClick={loop}>loop</button>
    </div>

  )

}

export default App;

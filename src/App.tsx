import React, { useEffect, useState } from "react";
import "./App.css";
import { IWord } from "./types";

function App() {
  const [arrWord, setArrWord] = useState(["box", "word", "live", "strong"]);
  const [word, setWord] = useState("");
  const [wordAudio, setWordAudio] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const getWord = () => {
    let index = 0;
    let dIndex = 0;
    let description: string[] = [];
    setInterval(async () => {
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
        // проерить и установить озвучку слова
        if (result[0].phonetics[2]) {
          setWordAudio(result[0].phonetics[2].audio);
        } else setWordAudio(result[0].phonetics[1].audio);
        // следующая итерация

        result[0].meanings[0].definitions.forEach;

        console.log(description);
        index++;
      }
    }, 1000);
  };

  useEffect(() => {
    console.log(wordIndex);
  }, [wordIndex]);

  return (
    <div className="App">
      <h4>Word</h4>
      <div>{word}</div>
      <audio src={wordAudio} autoPlay />
      <h4>Definitions</h4>
      <div>{}</div>
      <button onClick={getWord}>start</button>
      <button>stop</button>
      <button>restart</button>
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import { IWord } from "../types";
import Header from "../components/Header";
import Word from "../components/Word";
import Definitions from "../components/Definitions";
import Buttons from "../components/Buttons";
import Ticker from "../components/Ticker";
import "./styles/mainPage.css";
import nosleep from "nosleep.js";

interface MainPagesProps {
  arrWord: string[];
}

const MainPages = ({ arrWord }: MainPagesProps) => {
  const [word, setWord] = useState("");
  const [wordAudio, setWordAudio] = useState("");
  const [definitions, setDefinitions] = useState("");
  const noSleep = new nosleep();

  // отслеживает начало и окончание воспроизведения
  const [inProgress, setInProgress] = useState(false);
  // отслеживает зацикленность
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [startBtnAvailable, setStartBtnAvailable] = useState<boolean>(true)

  let interval: any = null

  const indexRef = useRef(1)

  const getWord = () => {
    noSleep.enable();
    indexRef.current = 1
    let definitionLength = 0;
    let intervalTime = 7000;
    const intervalFunction = async () => {
      console.log(indexRef.current)
      // проверка, что индекс не больше массива
      if (indexRef.current < arrWord.length) {
        // получение данных по API
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${arrWord[indexRef.current]}`
        );
        const result: IWord[] = await response.json();
        // установить слово, которое будет отображено
        setWord(result[0].word);

        // проверить и установить озвучку слова
        const speackDefinition = new SpeechSynthesisUtterance(arrWord[indexRef.current]);
        speackDefinition.lang = "en-US";
        speackDefinition.rate = 0.8;
        speechSynthesis.speak(speackDefinition);
        // установить описание текста
        const definition = result[0].meanings[0].definitions[0].definition;
        definitionLength = definition.length;

        setDefinitions(definition);
        setTimeout(() => {
          const speackDefinition = new SpeechSynthesisUtterance(definition);
          speackDefinition.lang = "en-US";
          speackDefinition.rate = 0.8;
          speechSynthesis.speak(speackDefinition);
        }, 1000);
        indexRef.current++
        // динамическое изменение интервала
        intervalTime = Math.ceil(definitionLength / 17 + 2) * 1000;
        // очистить интервал
        clearInterval(interval);
        interval = setInterval(intervalFunction, intervalTime);
      } else {
        setStartBtnAvailable(true)
        setInProgress(false);
        clearInterval(interval);
      }
    };
    interval = setInterval(intervalFunction, intervalTime);
  };

  const start = async () => {
    setInProgress(true);
    setStartBtnAvailable(false)
    // тоже самое что getWord, только для установления дефолтного значения, чтобы не ждать первой итерации интервала.
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${arrWord[0]}`
    );
    const result: IWord[] = await response.json();
    setWord(result[0].word);

    const speackDefinition = new SpeechSynthesisUtterance(arrWord[0]);
    speackDefinition.lang = "en-US";
    speackDefinition.rate = 0.8;
    speechSynthesis.speak(speackDefinition);

    const definition = result[0].meanings[0].definitions[0].definition;
    setDefinitions(definition);
    setTimeout(() => {
      const speackDefinition = new SpeechSynthesisUtterance(definition);
      speackDefinition.lang = "en-US";
      speackDefinition.rate = 0.8;
      speechSynthesis.speak(speackDefinition);
    }, 500);
    getWord();
  };

  const stop = () => {
    clearInterval(interval);
    indexRef.current = arrWord.length

    noSleep.disable();
    speechSynthesis.cancel();
    setInProgress(false);
    setIsLoop(false);
    setWord("");
    setDefinitions("");

  };


  const loop = () => {
    setIsLoop((prev) => !prev);
  };

  // запуск бесконечного повторения
  useEffect(() => {
    if (!inProgress && isLoop) {
      clearInterval(interval);
      speechSynthesis.cancel();
      start();
    }
  }, [isLoop, inProgress]);

  return (
    <div>
      <Header />
      <div className="main-container">
        <Ticker arrWord={arrWord} />
        <Word word={word} wordAudio={wordAudio}>
          Word:
        </Word>
        <Definitions word={definitions}>Definitions:</Definitions>
        <Buttons start={start} stop={stop} loop={loop} isLoop={isLoop} startBtnAvailable={startBtnAvailable} />
      </div>
    </div>
  );
};

export default MainPages;

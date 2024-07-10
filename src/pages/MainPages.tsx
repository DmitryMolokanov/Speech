import React, { useEffect, useState } from "react";
import { IWord } from "../types";
import Header from "../components/Header";
import Word from "../components/Word";
import Definitions from "../components/Definitions";
import Buttons from "../components/Buttons";
import Ticker from "../components/Ticker";
import "./styles/mainPage.css";

interface MainPagesProps {
  arrWord: string[];
}

const MainPages = ({ arrWord }: MainPagesProps) => {
  const [word, setWord] = useState("");
  const [wordAudio, setWordAudio] = useState("");
  const [definitions, setDefinitions] = useState("");

  const [mainInterval, setMainInterval] = useState<any>();
  // отслеживает начало и окончание воспроизведения
  const [inProgress, setInProgress] = useState(false);
  // отслеживает зацикленность
  const [isLoop, setIsLoop] = useState<boolean>(false);

  const getWord = () => {
    let index = 1;
    const interval = setInterval(async () => {
      // установка значения для очистка интервала
      setMainInterval(interval);
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
        if (result[0].phonetics.length > 0) {
          result[0].phonetics.some((el) => {
            if (el.audio) return setWordAudio(el.audio);
          });
        } else {
          const speackDefinition = new SpeechSynthesisUtterance(arrWord[index]);
          speackDefinition.lang = "en-US";
          speackDefinition.rate = 0.8;
          speechSynthesis.speak(speackDefinition);
        }

        // следующая итерация
        const definition = result[0].meanings[0].definitions[0].definition;
        setDefinitions(definition);
        setTimeout(() => {
          const speackDefinition = new SpeechSynthesisUtterance(definition);
          speackDefinition.lang = "en-US";
          speackDefinition.rate = 0.8;
          speechSynthesis.speak(speackDefinition);
        }, 1000);
        index++;
      } else setInProgress(false);
    }, 7000);
  };

  const start = async () => {
    setInProgress(true);
    // тоже самое что getWord, только для установления дефолтного значения, чтобы не ждать первой итерации интервала.
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${arrWord[0]}`
    );
    const result: IWord[] = await response.json();
    setWord(result[0].word);
    if (result[0].phonetics.length > 0) {
      result[0].phonetics.some((el) => {
        if (el.audio) return setWordAudio(el.audio);
      });
    } else {
      const speackDefinition = new SpeechSynthesisUtterance(arrWord[0]);
      speackDefinition.lang = "en-US";
      speackDefinition.rate = 0.8;
      speechSynthesis.speak(speackDefinition);
    }
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
    clearInterval(mainInterval);
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
      clearInterval(mainInterval);
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
        <Buttons start={start} stop={stop} loop={loop} isLoop={isLoop} />
      </div>
    </div>
  );
};

export default MainPages;

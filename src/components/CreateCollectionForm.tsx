import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import "../pages/styles/collectionPage.css";

interface CreateCollectionFormProps {
  collections: string[][];
  setCollections: (arr: string[][]) => void;
  setIsModal: (el: boolean) => void;
  changingCollection?: string[];
}

const CreateCollectionForm = ({
  collections,
  setCollections,
  setIsModal,
  changingCollection,
}: CreateCollectionFormProps) => {
  // при change устанавливать значение word из changingCollection, при создании - пустой массив
  const [words, setWords] = useState<string[]>(
    changingCollection ? changingCollection : [""]
  );
  // отключить кнопку добавления при пустом инпуте при создании новой коллекции
  const [prohibitAdd, setProhibitAdd] = useState<boolean>(
    changingCollection ? false : true
  );
  const [errWord, setErrWord] = useState<string[]>([]);
  const [touchWord, setTouchWord] = useState<string>();
  const [startTouchPosition, setStartTouchPosition] = useState<number | null>(null)
  const [allElPosition, setAllElPosition] = useState<number[]>([]);
  const [finalElPosition, setFinalElPosition] = useState<number | null>(null);
  const [indexGap, setIndexGap] = useState<number | null>(null);

  // добавить инпут
  const addInput = () => {
    setProhibitAdd(true);
    setWords([...words, ""]);
  };

  // проверить слово в словаре
  const checkWord = async (word: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const result = await response.json();
    if (result.title === "No Definitions Found") setErrWord([...errWord, word]);
  };

  // снять выделение некорректного слова
  const focusOnIncorrect = (word: string) => {
    const newErrArr = errWord.filter((item) => item !== word);
    setErrWord(newErrArr);
  };

  // управление инпутом
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.target.value) {
      // если инпут не пустой убрать сообщение об ошибке и разрешить добавлять новый инпут
      setProhibitAdd(false);
    } else setProhibitAdd(true);
    addNewWord(index, e.target.value);
  };
  //добавить слово
  const addNewWord = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  // удалить инпут или слово
  const removeWord = (word: string, index: number) => {
    const newErrArr = errWord.filter((item) => item !== word);
    setErrWord(newErrArr);
    const newWord = [...words];
    newWord.splice(index, 1);
    setWords(newWord);
  };

  // сохранить коллекцию
  const saveCollections = () => {
    let cleanWords;
    if (words.includes("")) {
      cleanWords = words.filter((word) => word !== "");
      setProhibitAdd(false);
      setWords(cleanWords);
    }
    if (errWord.length > 0) {
      console.log("err");
      return;
    }
    if (changingCollection) {
      const index = collections.findIndex(
        (arr) => JSON.stringify(arr) === JSON.stringify(changingCollection)
      );
      const newArr = [...collections];
      newArr.splice(index, 1, words);
      setCollections(newArr);
      setIsModal(false);
    } else {
      cleanWords = words.filter((word) => word !== "");
      setCollections([...collections, words]);
      setIsModal(false);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const position = e.touches[0].clientY
    const temporaryEl = document.body.querySelector('.temporaryEl') as HTMLElement
    temporaryEl.style.display = 'block'
    temporaryEl.style.top = position - 40 + 'px'
    // добавляет отступ при приближении указателя
    if (position) {
      const result = allElPosition.reduce(function (a, c) {
        return Math.abs(a - position) < Math.abs(c - position) ? a : c;
      });
      const indexInsert = allElPosition.findIndex((item) => item === result);
      if (indexInsert !== indexGap) setIndexGap(indexInsert);
    }
    setFinalElPosition(position);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const position = finalElPosition;
    // высчитать ближайший элемент над которым произошло touchend, то есть место, куда будет вставка
    if (position) {
      const result = allElPosition.reduce(function (a, c) {
        return Math.abs(a - position) < Math.abs(c - position) ? a : c;
      });
      document.body.querySelector('.temporaryEl')?.remove()
      const indexInsert = allElPosition.findIndex((item) => item === result);
      // вставить элемент
      let newWords = [...words];
      newWords = newWords.filter((item) => item !== touchWord);
      // если перетаскиваем сверху index-1 
      startTouchPosition && startTouchPosition > finalElPosition ? newWords.splice(indexInsert, 0, touchWord!) : newWords.splice(indexInsert - 1, 0, touchWord!)
      setWords(newWords);
      setFinalElPosition(null);
      setStartTouchPosition(null)
      setIndexGap(null);
    } else return;
  };

  useEffect(() => {
    // получить все элементы до touchStart чтобы пожно было к ним обращаться во время остольных touch событий
    const allInputs = document.body.querySelectorAll(".form-input");
    const form = document.body.querySelector('.form-collection')
    const temporaryEl = document.createElement('div')
    temporaryEl.className = 'temporaryEl'
    temporaryEl.style.display = 'none'
    form?.append(temporaryEl)
    const allOffsets = Array.from(allInputs).map((el: any) => el.offsetTop);
    setAllElPosition(allOffsets);
    // touchstart устанавливается через addEventListener для добавления { passive: false }. Без него нельязя добавить preventDefault()
    Array.from(allInputs).forEach((el) => {
      el.addEventListener(
        "touchstart",
        (e: any) => {
          setTimeout(() => {
            e.preventDefault();
            setStartTouchPosition(e.touches[0].clientY)
            temporaryEl.innerHTML = e.target.value
            setTouchWord(e.target.value);
          }, 0);
        },
        { passive: false }
      );
    });
  }, [words]);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <FormControl className="form-collection">
        {words.map((word, index) => {
          return (
            // инпут
            <TextField
              className="form-input"
              label={"word"}
              size="small"
              sx={{ mt: 1 }}
              value={word}
              autoFocus={true}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => {
                checkWord(word);
              }}
              onFocus={() => {
                focusOnIncorrect(word);
              }}
              onTouchMove={(e) => handleTouchMove(e)}
              onTouchEnd={(e) => {
                handleTouchEnd(e);
              }}
              style={
                index === indexGap ? { marginTop: "40px" } : { marginTop: "" }
              }
              error={errWord.includes(word)}
              helperText={errWord.includes(word) ? "incorrect word" : ""}
              InputProps={{
                // кнопка удаления
                endAdornment: (
                  <InputAdornment position="end">
                    {words.length > 1 ? (
                      <IconButton
                        size="small"
                        onClick={() => removeWord(word, index)}
                      >
                        <Delete />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              }}
            />
          );
        })}

        <Box
          component={"div"}
          sx={{ mt: 3 }}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            sx={{ width: "45%" }}
            onClick={() => saveCollections()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ width: "45%" }}
            color="secondary"
            onClick={() => addInput()}
            disabled={prohibitAdd}
          >
            Add
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default CreateCollectionForm;

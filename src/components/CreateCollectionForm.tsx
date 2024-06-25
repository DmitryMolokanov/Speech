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
  const [sendErr, setSendErr] = useState(false);
  const [errWord, setErrWord] = useState<string[]>([]);

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

  // управление инпутом
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    word: string
  ) => {
    if (e.target.value) {
      // если инпут не пустой убрать сообщение об ошибке и разрежить добавлять новый инпут
      setProhibitAdd(false);
      setSendErr(false);
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
    if (words.includes("")) {
      setSendErr(true);
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
      setCollections([...collections, words]);
      setIsModal(false);
    }
  };

  useEffect(() => {
    console.log(errWord);
  }, [errWord]);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <FormControl
        style={{
          backgroundColor: "white",
          padding: "20px 50px",
          width: "80vw",
        }}
      >
        {words.map((word, index) => {
          return (
            // инпут
            <TextField
              label={"word"}
              size="small"
              sx={{ mt: 1 }}
              value={word}
              autoFocus={true}
              style={
                sendErr && word === ""
                  ? { outline: "1px solid red" }
                  : { outline: "" }
              }
              onChange={(e) => handleChange(e, index, word)}
              onBlur={() => {
                checkWord(word);
              }}
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

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
  const [validation, setValidation] = useState<string[]>([]);

  // добавить инпут
  const addInput = () => {
    setWords([...words, ""]);
  };
  //добавить слово
  const addNewWord = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  // удалить инпут или слово
  const removeWord = (index: number) => {
    const newWord = [...words];
    newWord.splice(index, 1);
    setWords(newWord);
  };
  // проверить существование слова в словаре
  const checkWord = async (word: string, index: number) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const result = await response.json();
    } catch (err) {
      console.log(word);
    }
  };

  useEffect(() => {
    console.log(validation);
  }, [validation]);

  // сохранить коллекцию
  const saveCollections = () => {
    console.log(words);
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
              onChange={(e) => {
                addNewWord(index, e.target.value);
              }}
              onBlur={() => checkWord(word, index)}
              style={
                validation.includes(word)
                  ? { border: "1px solid red" }
                  : { borderColor: "" }
              }
              InputProps={{
                // кнопка удаления
                endAdornment: (
                  <InputAdornment position="end">
                    {words.length > 1 ? (
                      <IconButton
                        size="small"
                        onClick={() => removeWord(index)}
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
            onClick={addInput}
          >
            Add
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default CreateCollectionForm;

import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header"
import {
  IconButton,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IWord } from "../types";
import Details from "../components/Details";

interface DetailsCollectionProps {
  detailsCollection: string[];
}

const DetailsCollection = ({ detailsCollection }: DetailsCollectionProps) => {
  const [info, setInfo] = useState<IWord[]>();
  const [curWord, setCurWord] = useState<string>(detailsCollection[0] || "");
  const navigate = useNavigate();

  const handlMenuOpen = useCallback(async () => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${curWord}`
    );
    const result = await response.json();
    setInfo(result);
  }, [curWord]);

  useEffect(() => {
    if (curWord) handlMenuOpen();
  }, [curWord, handlMenuOpen]);

  return (
    <div>
      <Header />
      <IconButton
        sx={{ mt: 1, ml: 2 }}
        color={"primary"}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIos />
      </IconButton>
      <Grid container gap={1} sx={{ p: 1 }}>
        <Grid container flexDirection={"column"}>
          <Select
            sx={{ textAlign: "center", fontWeight: 700, fontSize: "20px", }}
            value={curWord}
            onChange={(e: SelectChangeEvent) => {
              return setCurWord(e.target.value);
            }}
          >
            {detailsCollection.map((word) => (
              <MenuItem key={word} value={word}>
                {word}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Details info={info} />
      </Grid>
    </div>
  );
};

export default DetailsCollection;

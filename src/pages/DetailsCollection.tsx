import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IconButton, Grid, Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IDefinitions, IMeanings, IWord } from "../types";
import Details from "../components/Details";

interface DetailsCollectionProps {
  detailsCollection: string[];
}

const DetailsCollection = ({ detailsCollection }: DetailsCollectionProps) => {
  const [info, setInfo] = useState<IWord[]>();
  const [curWord, setCurWord] = useState<string>("");
  const navigate = useNavigate();

  const handlMenuOpen = async (e: any) => {
    const word = e.currentTarget.textContent;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const result = await response.json();
    setInfo(result);

    setCurWord(word);
  };

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
          {detailsCollection.map((word) => (
            <Button
              variant={curWord === word ? "contained" : "outlined"}
              onClick={(e) => handlMenuOpen(e)}
            >
              {word}
            </Button>
          ))}
        </Grid>
        <Details info={info} />
      </Grid>
    </div>
  );
};

export default DetailsCollection;

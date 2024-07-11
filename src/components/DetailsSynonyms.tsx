import React from "react";
import { Typography, Grid } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

interface DetailsSynonymseProps {
  definition: {
    synonyms: string[];
  };
}

const DetailsSynonyms = ({ definition }: DetailsSynonymseProps) => {
  return (
    <div>
      <Typography className="details-additionally-title" sx={{ pt: 1 }}>synonyms:</Typography>
      <Grid container spacing={1} display={"flex"} className="details-additionally-synonyms">
        {definition.synonyms.map((word: string) => {
          return (
            <span >{word}</span>
          );
        })}
      </Grid>
    </div>
  );
};

export default DetailsSynonyms;

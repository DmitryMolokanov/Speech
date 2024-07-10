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
      <Typography style={{ textDecoration: "underline" }}>synonyms:</Typography>
      <Grid container spacing={1} display={"flex"}>
        {definition.synonyms.map((word: string) => {
          return (
            <Grid item xs={3} sx={{ mt: 2, p: 1, bgcolor: "lightGrey" }}>
              {word}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default DetailsSynonyms;

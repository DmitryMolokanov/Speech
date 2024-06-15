import React from "react";
import { Grid, Typography, Box } from "@mui/material";

interface WordProps {
  word: string;
  wordAudio?: string;
  children: React.ReactNode;
}

const Word = ({ word, wordAudio, children }: WordProps) => {
  return (
    <>
      <Box
        sx={{ mt: 1, p: 1 }}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography>{children}</Typography>
        <Typography
          style={
            children === "Word:" ? { minHeight: "30px" } : { minHeight: "" }
          }
          sx={{ p: 1 }}
        >
          <strong>{word}</strong>
        </Typography>
      </Box>
      <audio src={wordAudio} autoPlay />
    </>
  );
};

export default Word;

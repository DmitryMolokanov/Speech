import React from "react";
import {
  Grid,
  Typography,
  Box,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Button,
} from "@mui/material";
import { IMeanings } from "../types";
import { ExpandMore } from "@mui/icons-material";
import { IWord } from "../types";

interface DetailsProps {
  info?: IWord[];
}

const Details = ({ info }: DetailsProps) => {
  console.log(info);
  return (
    <div>
      {info ? (
        <Grid container display={"flex"} justifyContent={"center"}>
          {info[0].phonetics.map((item) =>
            item.audio ? (
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={() => {
                  const audio = new Audio(item.audio);
                  audio.play();
                }}
              >
                audio
              </Button>
            ) : null
          )}
        </Grid>
      ) : null}

      {info ? (
        <Grid
          width={"96vw"}
          border={"1px solid"}
          borderRadius={5}
          borderColor={"lightGray"}
          sx={{ mt: 2 }}
        >
          {info.map((item: IWord) => {
            return (
              <Grid
                container
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Typography color={"#363a40"}>
                  <strong>{item.meanings[0].partOfSpeech}</strong>
                </Typography>
                {item.meanings[0].definitions.map((definition) => {
                  return (
                    <Box width={"90vw"} padding={1}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMore color="primary" />}
                          color={"#27292b"}
                        >
                          {definition.definition}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography style={{ textDecoration: "underline" }}>
                            example:
                          </Typography>
                          {definition.example}
                          <Typography style={{ textDecoration: "underline" }}>
                            synonyms:
                          </Typography>
                          <Grid
                            container
                            spacing={1}
                            display={"flex"}
                            sx={{ mt: 1 }}
                          >
                            {definition.synonyms.map((word) => {
                              return (
                                <Grid item xs={3}>
                                  {word}
                                </Grid>
                              );
                            })}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </div>
  );
};

export default Details;

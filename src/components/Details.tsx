import React from "react";
import {
  Grid,
  Typography,
  Box,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Button,
  IconButton,
} from "@mui/material";
import { IMeanings } from "../types";
import { ExpandMore } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { IWord } from "../types";
import "../pages/styles/DetailsCollection.css";
import DetailsExample from "./DetailsExample";
import DetailsSynonyms from "./DetailsSynonyms";

interface DetailsProps {
  info?: IWord[];
}

const Details = ({ info }: DetailsProps) => {
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
          sx={{ mt: 2, backgroundColor: "white" }}
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
                          className="details-accordeon"
                          expandIcon={<ExpandMore color="primary" />}
                          color={"#27292b"}
                        >
                          {definition.example ||
                            definition.synonyms.length > 0 ? (
                            <IconButton className="details-add-materials">
                              <PostAddIcon />
                            </IconButton>
                          ) : null}

                          {definition.definition}
                        </AccordionSummary>
                        <AccordionDetails>
                          {definition.example && (
                            <DetailsExample definition={definition} />
                          )}

                          {definition.synonyms.length > 0 && (
                            <DetailsSynonyms definition={definition} />
                          )}
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

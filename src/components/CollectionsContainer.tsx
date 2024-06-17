import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import { Edit, Delete, List } from "@mui/icons-material";
import CreateCollectionForm from "./CreateCollectionForm";

interface CollectionsContainerProps {
  collections: string[][];
  setArrWord: (el: string[]) => void;
  setCollections: (el: string[][]) => void;
  setDetailsCollection: (el: string[]) => void
}

const CollectionsContainer = ({
  collections,
  setCollections,
  setArrWord,
  setDetailsCollection
}: CollectionsContainerProps) => {
  const [changingCollection, setChangingCollection] = useState<string[]>([]);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  const selectCollection = (item: string[]) => {
    setArrWord(item);

    navigate("/");
  };

  const showDetailsCollection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string[]) => {
    e.stopPropagation();
    navigate('/details-collection')
    setDetailsCollection(item)
  }

  const changeCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string[]
  ) => {
    e.stopPropagation();
    setIsModal(true);
    setChangingCollection(item);
  };

  const deleteCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string[]
  ) => {
    e.stopPropagation();
    const newCollections = collections.filter(
      (collection) => JSON.stringify(collection) !== JSON.stringify(item)
    );
    setCollections(newCollections);
  };

  return (
    <Grid
      container
      style={{ display: "flex", justifyContent: "center" }}
    >
      {collections.length > 0 &&
        collections.map((item) => {
          return (
            <Box
              width={160}
              display={"flex"}
              flexDirection={"column"}
              sx={{ border: "2px solid #4169e1 ", borderRadius: "7px", m: 1 }}
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => selectCollection(item)}
            >
              {item.map((word) => {
                return <div>{word}</div>;
              })}
              <Grid sx={{ mt: 1 }}>
                <IconButton
                  color="primary"
                  sx={{ m: 1 }}
                  onClick={(e) => { showDetailsCollection(e, item) }}
                >
                  <List />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={(e) => changeCollection(e, item)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  sx={{ m: 1 }}
                  onClick={(e) => {
                    deleteCollection(e, item);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Box>
          );
        })}
      <Modal open={isModal} onClose={() => setIsModal(false)}>
        <CreateCollectionForm
          collections={collections}
          setCollections={setCollections}
          setIsModal={setIsModal}
          changingCollection={changingCollection}
        />
      </Modal>
    </Grid>
  );
};

export default CollectionsContainer;

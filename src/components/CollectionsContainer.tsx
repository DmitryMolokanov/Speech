import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import { Edit, Delete, List } from "@mui/icons-material";
import CreateCollectionForm from "./CreateCollectionForm";
import CollectionBtnGroup from "./CollectionBtnGroup";

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
              sx={{ borderRadius: "7px", m: 1, pt: 1, backgroundColor: 'white', boxShadow: '1px 1px 2px 2px lightgray' }}
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => selectCollection(item)}
            >
              {item.slice(0, 3).map((word) => {
                return <div>{word}</div>;
              })}
              {item.length > 3 ? <span>...</span> : null}
              <CollectionBtnGroup
                item={item}
                showDetailsCollection={showDetailsCollection}
                changeCollection={changeCollection}
                deleteCollection={deleteCollection} />
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

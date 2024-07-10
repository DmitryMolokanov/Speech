import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import { Edit, Delete, List } from "@mui/icons-material";
import CreateCollectionForm from "./CreateCollectionForm";
import CollectionBtnGroup from "./CollectionBtnGroup";
import { ICollection } from "../types";

interface CollectionsContainerProps {
  collections: ICollection[];
  setArrWord: (el: string[]) => void;
  setCollections: (el: ICollection[]) => void;
  setDetailsCollection: (el: string[]) => void
}

const CollectionsContainer = ({
  collections,
  setCollections,
  setArrWord,
  setDetailsCollection
}: CollectionsContainerProps) => {
  const [changingCollection, setChangingCollection] = useState<ICollection | null>(null);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  const selectCollection = (item: ICollection) => {
    setArrWord(item.words);

    navigate("/");
  };

  const showDetailsCollection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ICollection) => {
    e.stopPropagation();
    navigate('/details-collection')
    setDetailsCollection(item.words)
  }

  const changeCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICollection
  ) => {
    e.stopPropagation();
    setIsModal(true);
    setChangingCollection(item);
  };

  const deleteCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICollection
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
              sx={{ borderRadius: "7px", m: 1, backgroundColor: 'white', boxShadow: '1px 1px 2px 2px lightgray' }}
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => selectCollection(item)}
            >
              <Typography className="collection-container-title">{item.title}</Typography>
              {item.words.slice(0, 3).map((word) => {
                return <div>{word}</div>;
              })}
              {item.words.length > 3 ? <span>...</span> : null}
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
    </Grid >
  );
};

export default CollectionsContainer;

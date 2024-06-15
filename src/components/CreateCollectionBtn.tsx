import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import CreateCollectionForm from "./CreateCollectionForm";

interface CreateCollectionBtnProps {
  collections: string[][];
  setCollections: (arr: string[][]) => void;
}

const CreateCollectionBtn = ({
  collections,
  setCollections,
}: CreateCollectionBtnProps) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Box
      component={"div"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Button
        sx={{ m: 2 }}
        variant="contained"
        startIcon={<AddCircle />}
        onClick={() => setIsModal(true)}
      >
        Create
      </Button>
      <Modal
        open={isModal}
        onClose={() => {
          setIsModal(false);
        }}
      >
        <CreateCollectionForm
          collections={collections}
          setCollections={setCollections}
          setIsModal={setIsModal}
        />
      </Modal>
    </Box>
  );
};

export default CreateCollectionBtn;

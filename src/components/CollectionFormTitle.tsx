import React, { useRef, FC } from "react";
import { TextField, InputAdornment, IconButton, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CollectionFormTitleProps {
  setTitle: (el: string | undefined) => void;
}

const CollectionFormTitle: FC<CollectionFormTitleProps> = ({ setTitle }) => {
  const titleRef = useRef<HTMLInputElement>(null);

  // добавить заголовок
  const handleAddTitle = () => {
    if (titleRef) setTitle(titleRef.current?.value);
  };

  return (
    <TextField
      inputRef={titleRef}
      label={"Title"}
      placeholder="Add title"
      size="small"
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                handleAddTitle();
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CollectionFormTitle;

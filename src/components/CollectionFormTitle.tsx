import React, { useRef, FC } from "react";
import { TextField, InputAdornment, IconButton, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CollectionFormTitleProps {
  setTitle: (el: string) => void;
  titleErr: boolean
  setTitleErr: (el: boolean) => void
}

const CollectionFormTitle: FC<CollectionFormTitleProps> = ({ setTitle, titleErr, setTitleErr }) => {
  const titleRef = useRef<HTMLInputElement>(null);

  // добавить заголовок
  const handleAddTitle = () => {
    if (titleRef) {
      setTitle(titleRef.current!.value)
      setTitleErr(false)
    };
  };

  return (
    <TextField
      inputRef={titleRef}
      label={"Title"}
      placeholder="Add title"
      size="small"
      error={titleErr}
      helperText={titleErr ? 'necessary field' : ''}
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

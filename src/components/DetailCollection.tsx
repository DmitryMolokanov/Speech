import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const DetailCollection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <IconButton sx={{ m: 2 }} color="primary" onClick={() => navigate(-1)}>
        <ArrowBackIos />
      </IconButton>
    </div>
  );
};

export default DetailCollection;

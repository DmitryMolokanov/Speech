import React from "react";
import { Typography } from "@mui/material";
interface DetailsExampleProps {
  definition: {
    example: string;
  };
}
const DetailsExample = ({ definition }: DetailsExampleProps) => {
  return (
    <div>
      {definition.example && (
        <div>
          <Typography style={{ textDecoration: "underline" }}>
            example:
          </Typography>
          <Typography sx={{ bgcolor: "lightgray", pr: 1 }}>
            {definition.example}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DetailsExample;

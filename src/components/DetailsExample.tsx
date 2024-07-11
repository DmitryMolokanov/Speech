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
          <Typography className="details-additionally-title">
            example:
          </Typography>
          <Typography className="details-additionally">
            <span>&#8220;{definition.example}&#8221;</span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DetailsExample;

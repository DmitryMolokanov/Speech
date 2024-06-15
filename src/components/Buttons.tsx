import { FC } from "react";
import { Button, Box } from "@mui/material";
import { AllInclusive, PlayCircle, StopCircle } from "@mui/icons-material";

interface ButtonsProps {
  start: () => void;
  stop: () => void;
  loop: () => void;
  isLoop: boolean;
}

const Buttons: FC<ButtonsProps> = ({ start, stop, loop, isLoop }) => {
  return (
    <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Button
        onClick={start}
        variant="contained"
        size="small"
        startIcon={<PlayCircle />}
      >
        start
      </Button>

      <Button
        onClick={stop}
        variant="contained"
        size="small"
        startIcon={<StopCircle />}
      >
        stop
      </Button>
      <Button
        onClick={loop}
        variant="contained"
        size="small"
        startIcon={<AllInclusive />}
        style={
          isLoop ? { backgroundColor: "#1DD300" } : { backgroundColor: "" }
        }
      >
        loop
      </Button>
    </Box>
  );
};

export default Buttons;

import React from "react";
import Word from "./Word";

interface DefinitionsProps {
  word: string;
  wordAudio?: string;
  children: React.ReactNode;
}

const Definitions = ({ word, children }: DefinitionsProps) => {
  return (
    <div style={{ minHeight: "150px" }}>
      <Word word={word}>{children}</Word>
    </div>
  );
};

export default Definitions;

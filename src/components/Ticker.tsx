import React from "react";
interface TickerProps {
  arrWord: string[];
}

const Ticker = ({ arrWord }: TickerProps) => {
  return (
    <div className="ticker-container">
      <div className="ticker-title">Current words:</div>
      <div className="ticker-word-container">
        {arrWord.map((word: string) => {
          return (
            <div key={word} className="ticker-word">
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ticker;

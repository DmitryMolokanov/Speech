import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPages from "./pages/MainPages";
import Collections from "./pages/Collections";

function App() {
  const [arrWord, setArrWord] = useState<string[]>([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPages arrWord={arrWord} />} />
          <Route
            path="/collections"
            element={<Collections setArrWord={setArrWord} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

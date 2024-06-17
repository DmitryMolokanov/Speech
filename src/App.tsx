import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPages from "./pages/MainPages";
import Collections from "./pages/Collections";
import DetailsCollection from "./pages/DetailsCollection";

function App() {
  const [arrWord, setArrWord] = useState<string[]>([]);
  const [detailsCollection, setDetailsCollection] = useState<string[]>([])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPages arrWord={arrWord} />} />
          <Route
            path="/collections"
            element={<Collections setArrWord={setArrWord} setDetailsCollection={setDetailsCollection} />}
          />
          <Route path="/details-collection" element={<DetailsCollection detailsCollection={detailsCollection} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

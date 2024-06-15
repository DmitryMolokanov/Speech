import { useState, useEffect } from "react";
import Header from "../components/Header";
import CreateCollectionBtn from "../components/CreateCollectionBtn";
import { Typography } from "@mui/material";
import CollectionsContainer from "../components/CollectionsContainer";

interface CollectionsProps {
  setArrWord: (el: string[]) => void;
}

const Collections = ({ setArrWord }: CollectionsProps) => {
  const [collections, setCollections] = useState<string[][]>([]);

  useEffect(() => {
    localStorage.collections &&
      setCollections(JSON.parse(localStorage.collections));
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      const jsonCollection = JSON.stringify(collections);
      localStorage.setItem("collections", jsonCollection);
    }
  }, [collections]);

  return (
    <div>
      <Header />
      {collections.length > 0 ? (
        <div>
          <CreateCollectionBtn
            collections={collections}
            setCollections={setCollections}
          />
          <CollectionsContainer
            collections={collections}
            setCollections={setCollections}
            setArrWord={setArrWord}
          />
        </div>
      ) : (
        <div>
          <Typography variant="h6">You don't have a collection yet</Typography>
          <CreateCollectionBtn
            collections={collections}
            setCollections={setCollections}
          />
        </div>
      )}
    </div>
  );
};

export default Collections;

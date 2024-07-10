import { useState, useEffect } from "react";
import Header from "../components/Header";
import CreateCollectionBtn from "../components/CreateCollectionBtn";
import { Typography } from "@mui/material";
import CollectionsContainer from "../components/CollectionsContainer";
import { ICollection } from "../types";

interface CollectionsProps {
  setArrWord: (el: string[]) => void;
  setDetailsCollection: (el: string[]) => void
}

const Collections = ({ setArrWord, setDetailsCollection }: CollectionsProps) => {
  const [collections, setCollections] = useState<ICollection[]>([]);

  useEffect(() => {
    localStorage.collections &&
      setCollections(JSON.parse(localStorage.collections));
  }, []);

  useEffect(() => {
    console.log(collections)
    if (collections.length > 0) {
      const jsonCollection = JSON.stringify(collections);
      console.log(jsonCollection)
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
            setDetailsCollection={setDetailsCollection}
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

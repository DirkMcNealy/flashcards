import React, { useEffect, useState } from "react";
import axios from "axios";
import FlashcardsHeader from "./FlashcardsHeader";

const FlashcardsMenu = ({ rootUrl, setAppCardSetName }) => {
  const [flashCardSets, setFlashCardSets] = useState([]);

  useEffect(() => {
    axios.get(rootUrl + "/cardSets").then((res) => {
      const fcs = [];
      for (const name in res.data) {
        fcs.push({
          name: name,
          description: res.data[name].description,
        });
      }
      setFlashCardSets(fcs);
    });
  }, [rootUrl]);

  //TODO format
  return (
    <>
      <FlashcardsHeader description="Choose a flash card set" />
      {flashCardSets.map((fcs) => (
        <button
          key={"menu/" + fcs.name}
          onClick={() => setAppCardSetName(fcs.name)}
        >
          {fcs.description}
        </button>
      ))}
    </>
  );
};

export default FlashcardsMenu;

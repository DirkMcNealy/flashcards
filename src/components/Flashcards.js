import React, { useEffect, useState } from "react";
import FlashcardsHeader from "./FlashcardsHeader";
import CardContainer from "./CardContainer";
import axios from "axios";

const Flashcards = ({ rootUrl, setAppCardSetName, cardSetName }) => {
  //state
  const [cards, setCards] = useState([]);
  const [description, setDescription] = useState("Loading card set...");

  useEffect(() => {
    axios.get(rootUrl + "/" + cardSetName).then((res) => {
      const data = res.data;
      setCards(res.data.cards);
      setDescription(res.data.description);
      return data;
    });
  }, [cardSetName, rootUrl]);

  //flashcard header
  //current card
  //statistics

  if (cards.length > 0) {
    return (
      <>
        <FlashcardsHeader description={description} />
        <CardContainer
          cards={shuffle(
            cards.map((c) => {
              return {
                ...c,
                answers: c.shuffle ? shuffle(c.answers) : c.answers,
              };
            })
          )}
        />
      </>
    );
  } else {
    return <FlashcardsHeader description={description} />;
  }
};

const shuffle = (input) => {
  const things = [...input];
  let i;
  let temp;
  for (i = 0; i < things.length; i++) {
    let index = Math.floor(Math.random() * (things.length - i)) + i;
    temp = things[i];
    things[i] = things[index];
    things[index] = temp;
  }
  return things;
};

export default Flashcards;

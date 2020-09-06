import React, { useState } from "react";
import "./App.css";
import Flashcards from "./components/Flashcards";
import FlashcardsMenu from "./components/FlashcardsMenu";

const rootUrl = "http://localhost:3001";

function App() {
  const [cardSetName, setCardSetName] = useState("");

  return (
    <div className="App">
      {cardSetName.length === 0 ? (
        <FlashcardsMenu rootUrl={rootUrl} setAppCardSetName={setCardSetName} />
      ) : (
        <Flashcards
          rootUrl={rootUrl}
          setAppCardSetName={setCardSetName}
          cardSetName={cardSetName}
        />
      )}
    </div>
  );
}

export default App;

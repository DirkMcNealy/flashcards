import React from "react";

const FlashcardsHeader = ({ description }) => {
  return (
    <>
      <header>
        <h1 className="header">{description}</h1>
      </header>
    </>
  );
};

export default FlashcardsHeader;

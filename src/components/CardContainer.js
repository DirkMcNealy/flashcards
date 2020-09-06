import React, { useState } from "react";
import * as PropTypes from "prop-types";

const CardContainer = ({ cards }) => {
  //unanswered
  //answered
  //completed
  //summary
  const [currentState, setCurrentState] = useState("unanswered");

  const [completedCards, setCompletedCards] = useState([]);

  const [cardStack, setCardStack] = useState(cards);

  const currentCard = { ...cardStack[0] };

  //TODO keeping answered correctly state on card. I don't like it.
  const next = () => {
    if (!currentCard.answeredIncorrectly) {
      setCardStack(cardStack.slice(1));
      setCompletedCards([...completedCards, currentCard]);
    } else {
      setCardStack([...cardStack.slice(1), currentCard]);
    }

    //TODO state is set all over the place! this code is a mess!
    setCurrentState("unanswered");
    currentCard.answeredIncorrectly = false;
  };

  const showSummary = () => {
    setCompletedCards([...completedCards, currentCard]);
    setCurrentState("summary");
  };

  const checkAnswer = (answer, correctCallback, incorrectCallback) => {
    if (answer === currentCard.correctAnswer) {
      correctCallback();
      //TODO gross
      if (cardStack.length === 1) {
        setCurrentState("completed");
      } else {
        setCurrentState("answered");
      }
    } else {
      currentCard.answeredIncorrectly = true;

      currentCard.timesIncorrect =
        (currentCard.timesIncorrect ? currentCard.timesIncorrect : 0) + 1;

      setCardStack(
        cardStack.map((c) =>
          c.question === currentCard.question ? currentCard : c
        )
      );

      incorrectCallback();
    }
  };

  if ("unanswered" === currentState) {
    return (
      <div className="card-container">
        <CurrentCard card={currentCard} checkAnswer={checkAnswer} />
      </div>
    );
  } else if ("answered" === currentState) {
    return (
      <div className="card-container">
        <CurrentCard card={currentCard} checkAnswer={checkAnswer} />
        <button onClick={next}>Next</button>
      </div>
    );
  } else if ("completed" === currentState) {
    return (
      <div className="card-container">
        <CurrentCard card={currentCard} checkAnswer={checkAnswer} />
        <button onClick={showSummary}>Show Summary</button>
      </div>
    );
  } else if ("summary" === currentState) {
    return (
      <div className="summary">
        <h2>Times missed</h2>
        {completedCards.map((card) => (
          <p>
            {card.question}: {card.timesIncorrect ? card.timesIncorrect : 0}
          </p>
        ))}
      </div>
    );
  }
};

function AnswerInput({ card, checkAnswer }) {
  switch (card.type) {
    case "multiple-choice":
      return (
        <MultipleChoiceAnswers
          answers={card.answers}
          question={card.question}
          checkAnswer={checkAnswer}
        />
      );
    case "text":
      return <TextAnswerInput key={card.question} checkAnswer={checkAnswer} />;
    default:
      return null;
  }
}

const TextAnswerInput = ({ checkAnswer }) => {
  const [textClassName, setTextClassName] = useState("");
  const [answer, setAnswer] = useState("");
  const correctCallback = () => {
    console.log("correct");
    setAnswer("");
    setTextClassName("correct-guess");
  };
  const incorrectCallback = () => {
    console.log("incorrect");
    setAnswer("");
    setTextClassName("incorrect-guess");
  };
  return (
    <div>
      <input
        className={textClassName}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        onClick={() => checkAnswer(answer, correctCallback, incorrectCallback)}
      >
        Submit
      </button>
    </div>
  );
};

function MultipleChoiceAnswers({ answers, question, checkAnswer }) {
  return (
    <div className="answers">
      {answers.map((answer) => {
        return (
          <button
            key={question + answer}
            onClick={(e) => {
              const answer = e.target.textContent;
              const correctCallback = () =>
                e.target.classList.add("correct-guess");
              const incorrectCallback = () =>
                e.target.classList.add("incorrect-guess");
              checkAnswer(answer, correctCallback, incorrectCallback);
            }}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}

MultipleChoiceAnswers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func,
};
const CurrentCard = ({ card, checkAnswer }) => {
  return (
    <>
      <div className="question">
        <p>{card.question}</p>
      </div>
      <AnswerInput card={card} checkAnswer={checkAnswer} />
    </>
  );
};

export default CardContainer;

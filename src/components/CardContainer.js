import React, {useState} from "react";


const CardContainer = ({cards}) => {
  //unanswered
  //answered correctly
  const [currentState, setCurrentState] = useState("unanswered");

  const [completedCards, setCompletedCards] = useState([]);

  const [cardStack, setCardStack] = useState(cards);

  const currentCard = cardStack[0];

  //TODO keeping answered correctly state on card. I don't like it.
  const next = () => {
    if (!currentCard.answeredIncorrectly) {
      setCardStack(cardStack.slice(1));
      setCompletedCards([...completedCards, currentCard]);
    } else {
      setCardStack([...cardStack.slice(1), currentCard])
    }

    //TODO state is set all over the place! this code is a mess!
    setCurrentState("unanswered");
    currentCard.answeredIncorrectly = false;
  }

  const showSummary = () => {
    setCurrentState("summary");
  }

  const checkAnswer = (e) => {
    if (e.target.textContent === currentCard.correctAnswer) {
      e.target.classList.add("correct-guess");
      //TODO gross
      if (cardStack.length === 1) {
        setCurrentState("completed");
      } else {
        setCurrentState("answered")
      }
    } else {
      currentCard.answeredIncorrectly = true;
      currentCard.timesIncorrect = (currentCard.timesIncorrect ? currentCard.timesIncorrect : 0) + 1;
      e.target.classList.add("incorrect-guess");
    }
  }

  if ("unanswered" === currentState) {
    return <div className="card-container">
      <CurrentCard card={currentCard} checkAnswer={checkAnswer}/>
    </div>
  } else if ("answered" === currentState) {
    return <div className="card-container">
      <CurrentCard card={currentCard} checkAnswer={checkAnswer}/>
      <button onClick={next}>Next</button>
    </div>
  } else if ("completed" === currentState) {
    return <div className="card-container">
      <CurrentCard card={currentCard} checkAnswer={checkAnswer}/>
      <button onClick={showSummary}>Show Summary</button>
    </div>
  } else if ("summary" === currentState) {
    return <div className="summary">
      <h2>Times missed</h2>
      {completedCards.map(card => <p>{card.question}: {card.timesIncorrect ? card.timesIncorrect : 0}</p>)}
    </div>
  }
}

const CurrentCard = ({card, checkAnswer}) => {
  return <>
    <div className="question"><p>{card.question}</p></div>
    <div className="answers">
      {
        card.answers.map(answer => {
          return <button
            key={card.question + answer}
            onClick={(e) => checkAnswer(e)}>{answer}
          </button>
        })
      }
    </div>
  </>

}

export default CardContainer;
import React, { useContext, useEffect } from "react";
import { AppContext } from "./App";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    solution,
    currAttempt,
    disabledLetters,
    setDisabledLetters,
    almostLetters,
    setAlmostLetters,
    correctLetters,
    setCorrectLetters,
  } = useContext(AppContext);
  // console.log(board);
  const letter = board[attemptVal][letterPos];

  const correct = solution[letterPos] === letter;
  const almost = !correct && letter !== "" && solution.includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter === "") {
      return;
    } else if (!correct && !almost) {
      setDisabledLetters((prevState) => [...prevState, letter]);
    } else if (correct) {
      setCorrectLetters((prevState) => [...prevState, letter]);
    } else {
      setAlmostLetters((prevState) => [...prevState, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState ? letterState : ""}>
      {letter}
    </div>
  );
};

export default Letter;

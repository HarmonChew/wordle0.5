import React, { useContext } from "react";
import { AppContext } from "./App";
import { generateNewWord } from "./Words";

const Gameover = () => {
  const {
    gameOver,
    solution,
    currAttempt,
    setGameOver,
    board,
    setBoard,
    setDisabledLetters,
    setAlmostLetters,
    setCorrectLetters,
    setCurrAttempt,
    setSolution,
    newGame,
    setNewGame,
  } = useContext(AppContext);

  const generateEmptyBoard = () => {
    return [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
  };

  const handleReplay = () => {
    console.log(generateEmptyBoard());
    setBoard(generateEmptyBoard());
    console.log(board);
    setGameOver({ gameover: false, success: false });
    setDisabledLetters([]);
    setAlmostLetters([]);
    setCorrectLetters([]);
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setNewGame(!newGame)
  };

  return (
    <div className="gameover">
      <h1>
        {gameOver.success
          ? "Congratulations!"
          : "You have not guessed the word"}
      </h1>
      <h3>
        {gameOver.success ? `Number of tries: ${currAttempt.attempt}` : ""}
      </h3>
      <h2>Correct word: {solution}</h2>
      <button className="btn" onClick={handleReplay}>
        Replay
      </button>
    </div>
  );
};

export default Gameover;

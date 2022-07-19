import React, { useCallback, useContext, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { AppContext } from "./App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"];

  const isValid = (str) => {
    return (
      (str.length === 1 && str.match(/[a-z]/i)) ||
      str === "ENTER" ||
      str === "BACKSPACE"
    );
  };

  const handleKeyBoard = useCallback((event) => {
    console.log(event.key);
    if (!isValid(event.key.toUpperCase())) {
      return;
    } else {
      selectLetter(event.key.toUpperCase());
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);

    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard]);

  const {
    solution,
    board,
    setBoard,
    currAttempt,
    setCurrAttempt,
    wordSet,
    disabledLetters,
    almostLetters,
    correctLetters,
    setGameOver,
  } = useContext(AppContext);

  const selectLetter = (letter) => {
    const currentBoard = [...board];

    if (letter === "ENTER") {
      if (currAttempt.letterPos !== 5) {
        alert("Attempt does not have 5 letters!");
        return;
      }

      let currWord = "";

      for (let i = 0; i < 5; i++) {
        currWord += board[currAttempt.attempt][i];
      }
      console.log(currWord);

      if (wordSet.has(currWord.toLowerCase())) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      } else {
        alert("Not in word list");
      }

      if (currAttempt.attempt === 5) {
        setGameOver({ gameover: true, success: false });
      }

      if (currWord === solution) {
        setGameOver({ gameover: true, success: true });
      }
    } else if (letter === "DELETE" || letter === "BACKSPACE") {
      if (currAttempt.letterPos === 0) {
        return;
      }
      currentBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(currentBoard);
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
    } else {
      if (currAttempt.letterPos > 4) {
        return;
      }
      currentBoard[currAttempt.attempt][currAttempt.letterPos] = letter;
      setBoard(currentBoard);
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
    }
  };

  console.log("Disabled characters [" + disabledLetters + "]");
  console.log("Almost characters [" + almostLetters + "]");
  console.log("Correct characters [" + correctLetters + "]");

  return (
    <div className="keyboard" onKeyDown={handleKeyBoard}>
      <div className="line line1">
        {keys1.map((letter) => {
          const state = disabledLetters.includes(letter)
            ? "error"
            : correctLetters.includes(letter)
            ? "correct"
            : almostLetters.includes(letter)
            ? "almost"
            : "";
          return (
            <div
              key={letter}
              className="key"
              onClick={() => selectLetter(letter)}
              id={state}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="line line2">
        {keys2.map((letter) => {
          const state = disabledLetters.includes(letter)
            ? "error"
            : correctLetters.includes(letter)
            ? "correct"
            : almostLetters.includes(letter)
            ? "almost"
            : "";
          return (
            <div
              key={letter}
              className="key"
              onClick={() => selectLetter(letter)}
              id={state}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="line line3">
        {keys3.map((letter) => {
          const state = disabledLetters.includes(letter)
            ? "error"
            : correctLetters.includes(letter)
            ? "correct"
            : almostLetters.includes(letter)
            ? "almost"
            : "";
          return (
            <div
              key={letter}
              className="key"
              onClick={() => selectLetter(letter)}
              id={state}
            >
              {letter}
            </div>
          );
        })}
        <div className="key" onClick={() => selectLetter("DELETE")}>
          <FiDelete />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;

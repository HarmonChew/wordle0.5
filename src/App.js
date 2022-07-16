import { useState, useEffect } from "react";
import "./index.css";
import Keyboard from "./Keyboard";
import Board from "./Board";
import { createContext } from "react";
import { defaultBoard } from "./Words";
import { generateWordSet, generateNewWord } from "./Words";
import Gameover from "./Gameover";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(defaultBoard);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState({});
  const [solution, setSolution] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [gameOver, setGameOver] = useState({ gameover: false, success: false });
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    generateWordSet().then((result) => setWordSet(result));
  }, []);

  useEffect(() => {
    generateNewWord().then((result) => {
      setSolution(result);
    });
  }, [newGame]);

  return (
    <div className="app">
      <nav>
        <h1>Wordle</h1>
      </nav>

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          solution,
          wordSet,
          disabledLetters,
          setDisabledLetters,
          almostLetters,
          setAlmostLetters,
          correctLetters,
          setCorrectLetters,
          setGameOver,
          gameOver,
          newGame,
          setNewGame,
        }}
      >
        <Board />
        {gameOver.gameover ? <Gameover /> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
};

export default App;

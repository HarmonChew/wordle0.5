import wordBank from "./wordle-allowed-guesses.txt";
import chosenWords from "./wordle-bank.txt";

export const defaultBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      wordSet = new Set(wordArr);
    });

  return wordSet;
};

export const generateNewWord = async () => {
  let wordArr;
  await fetch(chosenWords)
    .then((response) => response.text())
    .then((result) => {
      wordArr = result.split("\n");
    });

  return wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase();
};

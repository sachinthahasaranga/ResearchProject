import wordBank from "./wordle-bank.txt";

export const getboardDefault = () =>{

  const arr = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

  return arr;

} 



export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n").map((w) => w.trim().toLowerCase());
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      console.log(todaysWord)
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWord };
};

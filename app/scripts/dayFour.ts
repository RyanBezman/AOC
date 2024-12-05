const fs = require("fs");
const filePathFour = "../texts/dayFour.txt";
const fileFour = fs
  .readFileSync(filePathFour, "utf-8")
  .split("\n")
  .map((row) => row.split(""));

function countXmas(puzzle) {
  let count = 0;
  const rows = puzzle.length;
  const cols = puzzle[0].length;
  const word = "XMAS";

  const xAxis = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const yAxis = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const directions = [...xAxis, ...yAxis];

  function searchGrid(row, col, index) {
    if (index === word.length) {
      return true;
    }

    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      puzzle[row][col] !== word[index]
    ) {
      return false;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (puzzle[row][col] === word[0] && searchGrid(row, col, 0)) {
        count += 1;
      }
    }
  }
  return count;
}

const puzzleCount = countXmas(fileFour);
console.log(puzzleCount);
console.log(fileFour);

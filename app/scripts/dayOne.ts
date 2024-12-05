const fs = require("fs");

function getInputFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const lines = fileContent.trim().split("\n");

  let leftArray: number[] = [];
  let rightArray: number[] = [];

  for (const line of lines) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftArray.push(left);
    rightArray.push(right);
  }

  return { leftArray, rightArray };
}

function calculateTotalDistance(leftList, rightList) {
  const sortedLeft = [...leftList].sort((a, b) => a - b);
  const sortedRight = [...rightList].sort((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i < sortedLeft.length; i++) {
    totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
  }

  return totalDistance;
}

const filePath = "../texts/dayOne.txt";

const { leftArray, rightArray } = getInputFile(filePath);

const totalDistance = calculateTotalDistance(leftArray, rightArray);

console.log("Total Distance:", totalDistance);

function findSimiliarityScore(leftList, rightList) {
  const hash = {};
  let similarityScore = 0;

  for (const num of rightList) {
    if (hash[num]) {
      hash[num]++;
    } else {
      hash[num] = 1;
    }
  }

  for (const num of leftList) {
    if (hash[num]) {
      similarityScore += num * hash[num];
    }
  }

  return similarityScore;
}
const score = findSimiliarityScore(leftArray, rightArray);
console.log("Similarity score:", score);

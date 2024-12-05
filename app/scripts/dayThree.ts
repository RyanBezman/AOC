const fs = require("fs");
const filePathThree = "../texts/dayThree.txt";
const file = fs.readFileSync(filePathThree, "utf-8");
console.log(file);

function handlePairs(index: number, memory: string) {
  let pair = "";
  let nextIndex;
  const validCheck = memory.slice(index, index + 8);

  const isValid = validCheck.includes(")");

  if (!isValid) {
    nextIndex = index + 1;
    return { number: 0, nextIndex };
  }
  for (let i = index; i < memory.length; i++) {
    if (memory[i] === ")") {
      nextIndex = i;
      break;
    }
    pair += memory[i];
  }
  let number = pair.split(",").reduce((acc, el) => {
    return acc * +el;
  }, 1);
  return { number, nextIndex };
}

function fixMemory(memory: string) {
  let sum = 0;
  let isSearching = true;

  for (let i = 0; i < memory.length; i++) {
    let word = memory.slice(i, i + 4);
    let dont = memory.slice(i, i + 7);

    if (dont === "don't()") {
      isSearching = false;
      i++;
    }
    if (word === "do()") {
      isSearching = true;
      i++;
    }

    if (isSearching) {
      if (word === "mul(") {
        const newPair = handlePairs(i + 4, memory);
        const { number, nextIndex } = newPair;
        if (newPair.number) {
          sum += number;
          i = nextIndex;
        }
      }
    }
  }
  return sum;
}

const decipheredMemory = fixMemory(file);
console.log(decipheredMemory);

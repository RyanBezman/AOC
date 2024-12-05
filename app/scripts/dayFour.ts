const fs = require("fs");
const filePathFour = "../texts/dayFour.txt";
const fileFour = fs.readFileSync(filePathFour, "utf-8");

console.log(fileFour);

import { readFileSync } from "fs";
const fs = require("fs");

function getReports(filePath) {
  const file = fs.readFileSync(filePath, "utf-8");
  const data = file.split("\n");
  return data;
}

const dayTwoData = getReports("dayTwo.txt");

function handleSafeReport(num: number) {
  return num >= 1 && num <= 3;
}

function handleSafetyCheck(data) {
  const isSafe = data.every((num, i) => {
    if (i == 0) {
      return true;
    }
    const isAscending = data[0] < data[1];
    let prev = data[i - 1];
    let curr = num;
    let val = isAscending ? curr - prev : prev - curr;

    return handleSafeReport(val);
  });
  return isSafe;
}
type Report = string;

function calculateSafeReports(reports: Report[]) {
  let safeReports = 0;

  for (const report of reports) {
    const splitReport = report.split(" ").map((num) => +num);
    const isSafe = handleSafetyCheck(splitReport);
    if (isSafe) {
      safeReports++;
    }
  }
  return safeReports;
}

function calculateSafeReportsWithTolerance(reports: Report[]) {
  let safeReports = 0;

  for (const report of reports) {
    const splitReport = report.split(" ").map((num) => +num);
    const isSafe = handleSafetyCheck(splitReport);
    if (isSafe) {
      safeReports++;
    } else {
      for (let i = 0; i < splitReport.length; i++) {
        const newArr = [
          ...splitReport.slice(0, i),
          ...splitReport.slice(i + 1),
        ];
        const isNewSafe = handleSafetyCheck(newArr);
        if (isNewSafe) {
          safeReports++;
          break;
        }
      }
    }
  }
  return safeReports;
}
const amountOfSafeReports = calculateSafeReportsWithTolerance(dayTwoData);
console.log("Safe Reports:", amountOfSafeReports);

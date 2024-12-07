import {
  parseData,
  readData,
  Result,
  checkUpdate,
  makeReSort,
  correctNumbers as sumMiddleNumbers,
} from "./day5";

test("should read data from file", () => {
  let has = readData("./example.txt");
  let want = `14|15\n\n13,14,15\n`;
  expect(has).toEqual(want);
});

test("should split data to rules and updated", () => {
  const data = readData("./example.txt");
  const result: Result = parseData(data);
  expect(result).toEqual({
    rules: { 14: [15] },
    updated: [[13, 14, 15]],
  });
});

test("should split data to rules and update value of key", () => {
  const result: Result = parseData(`14|15\n14|16\n\n14,15,16`);
  expect(result).toEqual({
    rules: { 14: [15, 16] },
    updated: [[14, 15, 16]],
  });
});

test("first update should be correct by the rules", () => {
  const data = readData("./example2");
  const result: Result = parseData(data);
  const first_update = result.updated[0] || [];
  console.log(result.rules);
  expect(checkUpdate(first_update, result.rules)).toEqual(true);
});

test.each<number[]>([
  // [75, 97, 47, 61, 53],
  // [61, 13, 29],
  [97, 13, 75, 29, 47],
])(`not correct rules should be resorted $input`, (...input: number[]) => {
  const data = readData("./example2");
  const result: Result = parseData(data);
  let sorted = makeReSort(input, result.rules);
  expect(checkUpdate(sorted, result.rules)).toEqual(true);
});

test("calculate middle for example", () => {
  const data = readData("./example2");
  const result: Result = parseData(data);
  expect(sumMiddleNumbers(result)).toEqual(143);
});

test("calculate real input", () => {
  const data = readData("./input.txt");
  const result: Result = parseData(data);
  expect(sumMiddleNumbers(result)).toEqual(4185);
});

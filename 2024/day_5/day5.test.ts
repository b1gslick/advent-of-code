import { parseData, readData, Result, checkUpdate } from "./day5";

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
  expect(checkUpdate(first_update, result)).toEqual(true);
});

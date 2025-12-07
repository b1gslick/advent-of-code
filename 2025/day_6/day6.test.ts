import { calculate, calculateAsStrings, getNumberInReverseOrder, getNumbersAsString, getNumbersByCols, readData } from "./day_6";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(64);
});

test("should return range from file", () => {
  const data = readData("./example.txt");
  const result = getNumbersByCols(data)
  const ex = [[123, 328, 51, 64], [45, 64, 387, 23], [6, 98, 215, 314]]
  expect(result[0]).toEqual(ex)
})

test("operand should be * + * + in example", () => {
  const data = readData("./example.txt");
  const result = getNumbersByCols(data)
  const ex = ["*", "+", "*", "+"]
  expect(result[1]).toEqual(ex)
})

test("result in example should be 4277556", () => {
  const data = readData("./example.txt");
  const result = getNumbersByCols(data)
  expect(calculate(result)).toEqual(4277556)
})
test.skip("result in real input should be 3261038365331", () => {
  const data = readData("./input.txt");
  const result = getNumbersByCols(data)
  expect(calculate(result)).toEqual(3261038365331)
})


test("get number from example as string", () => {
  const data = readData("./example.txt");
  const string = getNumbersAsString(data);
  const expected = new Map(
    [
      [0, ["123", "328", "-51", "64-"]],
      [1, ["-45", "64-", "387", "23-"]],
      [2, ["--6", "98-", "215", "314"]],
    ]
  )
  expect(string).toEqual(expected);
})
type testData = {
  numbers: string[];
  result: number[];
};

test.each<testData>([
  {
    numbers: ["123", "-45", "--6"],
    result: [1, 24, 356],
  },
  {
    numbers: ["328", "64-", "98-"],
    result: [369, 248, 8],
  },
])("get numbers $numbers from one columns should $result", ({ numbers, result }) => {
  const realNumbers = getNumberInReverseOrder(numbers)
  expect(realNumbers).toEqual(result)
})

test("calculate example 3263827", () => {
  const data = readData("./example.txt");
  const string = getNumbersAsString(data);
  const result = getNumbersByCols(data)
  expect(calculateAsStrings(string, result[1])).toEqual(3263827)
})

test("calculate input 3263827", () => {
  const data = readData("./input.txt");
  const string = getNumbersAsString(data);
  const result = getNumbersByCols(data)
  expect(calculateAsStrings(string, result[1])).toEqual(3263827)
})

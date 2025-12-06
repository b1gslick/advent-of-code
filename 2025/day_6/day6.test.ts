import { calculate, getNumbersAsString, getNumbersByCols, readData } from "./day_6";

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
  const ex = [
    ["123", "328", "51", "64"],
    ["45", "64", "387", "23"],
    ["6", "98", "215", "314"],
  ]
  expect(string).toEqual(ex);
})

test("get numbers by rows and colums", () => {
  const strings = getNumbersAsString(readData("./example.txt"));
  const realNumbers = getRealNumbers(strings)
  const ex = [
    ["123", "328", "51", "64"],
    ["45", "64", "387", "23"],
    ["6", "98", "215", "314"],
  ]

})

//
// type testData = {
//   stones: string;
//   times: number;
//   result: string;
// };
//
// test.each<testData>([
//   {
//     stones: "125 17",
//     times: 1,
//     result: "253000 1 7",
//   },
//   {
//     stones: "125 17",
//     times: 2,
//     result: "253 0 2024 14168",
//   },
//   {
//     stones: "125 17",
//     times: 3,
//     result: "512072 1 20 24 28676032",
//   },
//   {
//     stones: "125 17",
//     times: 4,
//     result: "512 72 2024 2 0 2 4 2867 6032",
//   },
//   {
//     stones: "125 17",
//     times: 5,
//     result: "1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32",
//   },
//   {
//     stones: "125 17",
//     times: 6,
//     result:
//       "2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2",
//   },
// ])("with $stones should have $result after $times", (testData) => {
//   expect(blinks(testData.stones, testData.times)).toEqual(testData.result);
// });
//
// test("real example with 25 times", () => {
//   let has = "6571 0 5851763 526746 23 69822 9 989";
//   let times = 25;
//   let anwser = blinks(has, times);
//   let stones = anwser.split(" ").length;
//   expect(stones).toEqual(203953);
// });
//
// test("real exmaple no rec 75 times", () => {
//   let has = "6571 0 5851763 526746 23 69822 9 989";
//   let times = 75;
//   expect(blinks_no_rec(has, times)).toEqual(203953);
// });

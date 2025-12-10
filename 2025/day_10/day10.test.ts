import { addNTimesButton, findVariants, getSchemaButtons, getSum, lessLength, press, readData } from "./day_10";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(175);
});

test("should read schema and buttons", () => {
  const data = readData("./example.txt");
  const schemaButtons = getSchemaButtons(data);
  expect(schemaButtons[0]).toEqual([[0, 1, 1, 0], [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]]]);
})


test("one press", () => {
  expect(press([0, 0, 0, 0], [0, 2])).toEqual([1, 0, 1, 0])
  expect(press([1, 0, 0, 0], [0, 2])).toEqual([0, 0, 1, 0])
})

test("return all possible variants for first line", () => {
  const firstLine = [[0, 1, 1, 0], [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]]]
  const result = findVariants(firstLine)
  const len = lessLength(result)
  expect(len).toEqual(2)
})

test("return dublicates array", () => {
  const firstLine: any = [[0, 1, 1, 0], [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]]]
  expect(addNTimesButton(firstLine[1], 3).length).toEqual(24)
})

test("sum of all length in examples", () => {
  const schemaButtons = getSchemaButtons(readData("./example.txt"));
  expect(getSum(schemaButtons)).toEqual(7);
})
test.only("sum of all length in real", () => {
  const schemaButtons = getSchemaButtons(readData("./real.txt"));
  expect(getSum(schemaButtons)).toEqual(7);
})

// type testData = {
//   a: number[];
//   b: number[];
//   expected: number;
// };
//
// test.each<testData>([
//   {
//     a: [2, 5], b: [9, 7], expected: 24,
//   },
//   {
//     a: [7, 1], b: [11, 7], expected: 35,
//   },
//   {
//     a: [7, 3], b: [2, 3], expected: 6,
//   },
//   {
//     a: [2, 5], b: [11, 1], expected: 50,
//   },
// ])("$a and $b should return rectangle as $expected", ({ a, b, expected }) => {
//   expect(getRectangle(a, b)).toEqual(expected);
// })

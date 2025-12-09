import { getChords, getMaxRectangle, getRectangle, readData } from "./day_9";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(34);
});

type testData = {
  a: number[];
  b: number[];
  expected: number;
};

test.each<testData>([
  {
    a: [2, 5], b: [9, 7], expected: 24,
  },
  {
    a: [7, 1], b: [11, 7], expected: 35,
  },
  {
    a: [7, 3], b: [2, 3], expected: 6,
  },
  {
    a: [2, 5], b: [11, 1], expected: 50,
  },
])("$a and $b should return rectangle as $expected", ({ a, b, expected }) => {
  expect(getRectangle(a, b)).toEqual(expected);
})

test("should read data as array of chords", () => {
  const example = readData("./example.txt");
  const chords: number[][] = getChords(example);
  expect(chords.length).toEqual(8);
})

test("should return max for each chord", () => {
  const example = readData("./example.txt");
  const chords: number[][] = getChords(example);
  expect(getMaxRectangle(chords)).toEqual(50)
})
test("should return max for each chord in real", () => {
  const example = readData("./real.txt");
  const chords: number[][] = getChords(example);
  expect(getMaxRectangle(chords)).toEqual(4745816424)
})

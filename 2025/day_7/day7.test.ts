import { buildMatrix, calculate, findStart, readData, stepDown } from "./day_7";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(256);
});

test("should got matrix for example", () => {
  const example = readData("./example.txt");
  const matrix = buildMatrix(example);
  expect(matrix.length).toEqual(16);
  expect(matrix[0]?.length).toEqual(15);
})

test("should find S in the matrix", () => {
  const example = readData("./example.txt");
  const matrix = buildMatrix(example);
  expect(findStart(matrix)).toEqual([0, 7]);
})

test("should one step down return [2, 5], [2, 8]", () => {
  const matrix = buildMatrix(readData("./example.txt"));
  const start = findStart(matrix);
  const stepDown1 = stepDown(matrix, [start]);
  expect(stepDown1[0]).toEqual([[1, 7]]);
  expect(stepDown1[0]).not.toBeUndefined()
  expect(stepDown1[1]).toEqual(0)
  const stepDown2 = stepDown(matrix, stepDown1[0]);
  expect(stepDown2[0]).toEqual([[2, 6], [2, 8]])
  expect(stepDown2[1]).toEqual(1)
  const stepDown3 = stepDown(matrix, stepDown2[0]);
  expect(stepDown3[0]).toEqual([[3, 6], [3, 8]])
  expect(stepDown3[1]).toEqual(0)
  const stepDown4 = stepDown(matrix, stepDown3[0]);
  expect(stepDown4[0]).toEqual([[4, 5], [4, 7], [4, 9]])
  expect(stepDown4[1]).toEqual(2)
})

test("should calculate split for example equal 21", () => {
  const matrix = buildMatrix(readData("./example.txt"));
  const result = calculate(matrix);
  expect(result).toEqual(21)
})

test("should calculate split for real equal 1672", () => {
  const matrix = buildMatrix(readData("./real.txt"));
  const result = calculate(matrix);
  expect(result).toEqual(1672)
})

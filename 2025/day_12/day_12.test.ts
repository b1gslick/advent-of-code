import { flip, getFit, getTestData, readData, rotateMatrix } from "./day_12";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(149);
});

test("should get shapes and lines for presents", () => {
  const [shapes, presents] = getTestData(readData("./example.txt"));
  expect(shapes.length).toEqual(6);
  expect(presents.length).toEqual(3)
})

test("should possible for rotate present", () => {
  const present = [[1, 1, 1], [1, 1, 0], [1, 1, 0]]
  const rotateLeft = [[1, 0, 0], [1, 1, 1], [1, 1, 1]]
  const rotateRight = [[1, 1, 1], [1, 1, 1], [0, 0, 1]]
  const rotateLeft2 = [[0, 1, 1], [0, 1, 1], [1, 1, 1]]
  const firstTimeLeft = rotateMatrix(present, "l")
  expect(firstTimeLeft).toEqual(rotateLeft)
  expect(rotateMatrix(present, "r")).toEqual(rotateRight)
  expect(rotateMatrix(firstTimeLeft, "l")).toEqual(rotateLeft2)
})

test("should flip horizontally", () => {
  const present = [[1, 1, 1], [1, 1, 0], [1, 1, 0]]
  const horizontally = [[1, 1, 0], [1, 1, 0], [1, 1, 1]]
  const verticaly = [[1, 1, 1], [0, 1, 1], [0, 1, 1]]
  expect(flip(present, 'h')).toEqual(horizontally)
  expect(flip(present, 'v')).toEqual(verticaly)
})

test("fit 4 figure to box 4x4", () => {
  const [shapes, presents] = getTestData(readData("./example.txt"));

  // @ts-ignore
  const matrix: any = Array.from({ length: presents[0].size[0] }, () => Array(presents[0].size[1]).fill(0));
  // @ts-ignore
  expect(getFit(shapes[4], presents[0], matrix)).toEqual(true)
})

// ### 1 1 1
// ##. 1 1 0
// ##. 1 1 0
//
// flip horizontally
// ### 1 1 0
// ##. 1 1 0
// ##. 1 1 1
//
//flip vertically
// ### 1 1 1
// ##. 0 1 1
// ##. 0 1 1
//
// #.. 1 0 0
// ### 1 1 1
// ### 1 1 1
//
// .## 0 1 1
// .## 0 1 1
// ### 1 1 1
//
// ###
// ###
// ..#
//
// right
// ###
// ###
// ..#
//
// .##
// .##
// ###
//
// #..
// ###
// ###
//
//
//
// ####
// ####
// ####
// ####

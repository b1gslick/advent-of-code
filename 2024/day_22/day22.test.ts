import { calculateGPS, Data, getNewGrid, parseData, readData } from "./day_15";

test("should read data from file", () => {
  const has = readData("./example.txt");
  expect(has.length).toBeGreaterThan(0);
});

test("parse steps and fields", () => {
  const data = readData("./example.txt");
  const has: Data = parseData(data);
  expect(has.steps).toEqual(
    "<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^",
  );
});

test("robot could steps on the grid", () => {
  const has = parseData(readData("./example.txt"));
  const grid = getNewGrid(has);
  const result = calculateGPS(grid);
  expect(result).toEqual(10092);
});

test("we should result real result", () => {
  const raw = parseData(readData("./real.txt"));
  const result = calculateGPS(getNewGrid(raw));
  expect(result).toEqual(1438161);
});

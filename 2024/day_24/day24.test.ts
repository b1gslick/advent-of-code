import { calculate, parseData, readData } from "./day_24";

test("should read data from file", () => {
  const has = readData("./example.txt");
  expect(has.length).toBeGreaterThan(0);
});

test("We can get gates and condition values", () => {
  const data = readData("./example.txt");
  const has = parseData(data);
  const want = {
    conditions: [
      { left: "x00", operator: "AND", result: "z00", right: "y00" },
      {
        left: "x01",
        operator: "XOR",
        result: "z01",
        right: "y01",
      },
      { left: "x02", operator: "OR", result: "z02", right: "y02" },
    ],
    gates: {
      x00: 1,
      x01: 1,
      x02: 1,
      y00: 0,
      y01: 1,
      y02: 0,
    },
  };
  expect(has).toStrictEqual(want);
});

test("got z value", () => {
  const data = parseData(readData("./example.txt"));
  const want = calculate(data);
  const ex = 0b100;
  expect(want).toEqual(ex);
});

test("parse larger example", () => {
  const data = parseData(readData("./larger.txt"));
  const want = calculate(data);
  expect(want).toEqual(0b0011111101000);
  expect(want).toEqual(2024);
});

test("real example", () => {
  const data = parseData(readData("./real.txt"));
  const want = calculate(data);
  expect(want).toEqual(49520947122770);
});

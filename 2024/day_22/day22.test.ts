import {
  first_step,
  makeSequence,
  second_step,
  third_step,
  readData,
} from "./day_22";

test("should read data from file", () => {
  const has = readData("./example.txt");
  expect(has[0]).toEqual(1);
  expect(has[1]).toEqual(10);
  expect(has[2]).toEqual(100);
  expect(has[3]).toEqual(2024);
});

test("should process first step", () => {
  const has = readData("./example.txt")[0];
  //@ts-ignore
  expect(first_step(parseInt(has))).toEqual(65);
});

test("second step", () => {
  const has = readData("./example.txt")[0];
  //@ts-ignore
  const after_first = first_step(parseInt(has));
  expect(second_step(after_first)).toEqual(67);
});

test("third step", () => {
  const has = readData("./example.txt")[0];
  //@ts-ignore
  const after_first = first_step(parseInt(has));
  const second = second_step(after_first);

  expect(third_step(second)).toEqual(137283);
});

test("sequence of 123", () => {
  //@ts-ignore
  const result = makeSequence(123, 3);
  expect(result).toEqual(16495136);
});

type TestData = {
  times: number;
  want: number;
};

test.each<TestData>([
  {
    times: 1,
    want: 15887950,
  },
  {
    times: 2,
    want: 16495136,
  },
  {
    times: 3,
    want: 527345,
  },
  {
    times: 4,
    want: 704524,
  },
  {
    times: 5,
    want: 1553684,
  },
  {
    times: 6,
    want: 12683156,
  },
  {
    times: 7,
    want: 11100544,
  },
  {
    times: 8,
    want: 12249484,
  },
  {
    times: 9,
    want: 7753432,
  },
  {
    times: 10,
    want: 5908254,
  },
])("sequence of 123 after $times equal $want", ({ times, want }) => {
  const result = makeSequence(123, times);
  //@ts-ignore
  expect(result).toEqual(want);
});

test("sequenc of 16495136 should equal to 527345", () => {
  const result = makeSequence(16495136, 1);
  //@ts-ignore
  expect(result).toEqual(527345);
});

test("sequence 1 of 2000", () => {
  //@ts-ignore
  const has = parseInt(readData("./example.txt")[0]);
  const result = makeSequence(has, 2000);
  expect(result).toEqual(8685429);
});

test("sequence 10 of 2000", () => {
  //@ts-ignore
  const has = parseInt(readData("./example.txt")[1]);
  const result = makeSequence(has, 2000);
  expect(result).toEqual(4700978);
});

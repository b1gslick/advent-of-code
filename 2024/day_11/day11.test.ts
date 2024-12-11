import { blinks, blinks_no_rec, make_blink } from "./day_11";

test("should read data from file", () => {
  const has = "125 17";
  let first_blink = make_blink(has);
  expect(first_blink).toEqual("253000 1 7");
});

type testData = {
  stones: string;
  times: number;
  result: string;
};

test.each<testData>([
  {
    stones: "125 17",
    times: 1,
    result: "253000 1 7",
  },
  {
    stones: "125 17",
    times: 2,
    result: "253 0 2024 14168",
  },
  {
    stones: "125 17",
    times: 3,
    result: "512072 1 20 24 28676032",
  },
  {
    stones: "125 17",
    times: 4,
    result: "512 72 2024 2 0 2 4 2867 6032",
  },
  {
    stones: "125 17",
    times: 5,
    result: "1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32",
  },
  {
    stones: "125 17",
    times: 6,
    result:
      "2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2",
  },
])("with $stones should have $result after $times", (testData) => {
  expect(blinks(testData.stones, testData.times)).toEqual(testData.result);
});

test("real example with 25 times", () => {
  let has = "6571 0 5851763 526746 23 69822 9 989";
  let times = 25;
  let anwser = blinks(has, times);
  let stones = anwser.split(" ").length;
  expect(stones).toEqual(203953);
});

test("real exmaple no rec 75 times", () => {
  let has = "6571 0 5851763 526746 23 69822 9 989";
  let times = 75;
  expect(blinks_no_rec(has, times)).toEqual(203953);
});

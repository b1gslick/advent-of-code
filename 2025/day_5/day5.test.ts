import { calcuateFreshes, findFresh, getItemsIDs, getRanges, readData } from "./day_5";

test("should read data from file", () => {
  const example = readData("./example.txt");
  expect(example.length).toEqual(38);
});

test("should return range from file", () => {
  const data = readData("./example.txt");
  const ranges = getRanges(data)
  const ex = [[3, 5], [10, 14], [16, 20], [12, 18]]
  expect(ranges).toEqual(ex)
})


test("calculate all possible freshes range for example should return 14", () => {
  const data = readData("./example.txt");
  const ranges = getRanges(data)
  expect(calcuateFreshes(ranges)).toEqual(14)
})

test("should get ID for from data", () => {
  const data = readData("./example.txt");
  const itemsIDs = getItemsIDs(data)
  const ex = [1, 5, 8, 11, 17, 32]
  expect(itemsIDs).toEqual(ex)
})

test("example items should be 3", () => {
  const data = readData("./example.txt");
  const ranges = getRanges(data)
  const itemsIDs = getItemsIDs(data)
  const fresh = findFresh(ranges, itemsIDs)
  expect(fresh).toEqual(3)
})

test("real items should be 3", () => {
  const data = readData("./real.txt");
  const ranges = getRanges(data)
  const itemsIDs = getItemsIDs(data)
  const fresh = findFresh(ranges, itemsIDs)
  expect(fresh).toEqual(3)
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

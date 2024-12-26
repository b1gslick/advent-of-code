import * as fs from "fs";

export const readData = (path: string): number[] => {
  const file = fs.readFileSync(path).toString();
  const result: number[] = [];
  const temp = file.split("\n");
  for (let num of temp) {
    if (num.length > 0) {
      result.push(parseInt(num));
    }
  }
  return result;
};

export const makeSequence = (num: number, times: number): number => {
  let res = num;
  for (let i = 0; i < times; i++) {
    res = first_step(res);
    res = second_step(res);
    res = third_step(res);
    console.log(res);
  }

  return res;
};

export const first_step = (num: number): number => {
  const value = num * 64;
  return prune(mix(value, num));
};

export const second_step = (num: number): number => {
  const value = num / 32;
  return prune(mix(value | 0, num));
};

export const third_step = (num: number): number => {
  const value = num * 2048;
  return prune(mix(value, num));
};

export const mix = (values: number, secret: number): number => {
  return values ^ secret;
};

export const prune = (secret: number): number => {
  return secret % 16777216;
};

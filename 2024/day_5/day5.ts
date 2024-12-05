import * as fs from "fs";

export type Result = {
  rules: Record<number, number[]>;
  updated: Array<Array<number>>;
};

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();

  return file;
};

export const parseData = (data: string): Result => {
  let result: Result = { rules: {}, updated: [] };
  let rules: Record<number, number[]> = {};
  let updated = new Array();
  const test = data.split("\n");
  for (const data of test) {
    if (data.trim().length > 0) {
      if (data.includes("|")) {
        const temp = data.split("|");
        let key = parseInt(temp[0] || "");
        let value = parseInt(temp[1] || "");
        if (!rules[key]) {
          rules[key] = [value];
        } else {
          rules[key].push(value);
        }
      } else {
        let temp = [];
        for (const num of data.split(",")) {
          temp.push(parseInt(num));
        }
        updated.push(temp);
      }
    }
  }
  result.rules = rules;
  result.updated = updated;
  return result;
};

export const checkUpdate = (data: number[], result: Result): boolean => {
  const reversed = data.reverse();
  let temp = [];
  for (let i = 0; i < data.length; i++) {}
  console.log(data, result);
  return false;
};

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

export const checkUpdate = (
  data: number[],
  r: Record<number, number[]>,
): boolean => {
  const reversed = data.toReversed();
  let temp: number[] = [];

  for (const num of reversed) {
    for (const n of temp) {
      const rules = r[num];
      if (!rules?.includes(n)) {
        return false;
      }
    }
    temp.push(num);
  }
  return true;
};

export const correctNumbers = (result: Result): number => {
  let res = 0;

  for (const update of result.updated) {
    if (checkUpdate(update, result.rules)) {
      const mid = Math.floor(update.length / 2);
      res += update[mid] || 0;
    }
  }
  return res;
};

export const makeReSort = (
  toResort: number[],
  rules: Record<number, number[]>,
): number[] => {
  console.log("before sort", toResort);
  if (checkUpdate(toResort, rules)) {
    return toResort;
  }
  // [97, 13, 75, 29, 47],
  for (const r of toResort) {
    // 13
    for (let i = 1; i < toResort.length; i++) {
      // i = 1
      const rule = rules[r] || [];
      // {
      //   '29': [ 13 ],
      //   '47': [ 53, 13, 61, 29 ],
      //   '53': [ 29, 13 ],
      //   '61': [ 13, 53, 29 ],
      //   '75': [ 29, 53, 47, 61, 13 ],
      //   '97': [ 13, 61, 47, 29, 53, 75 ]
      // }
      const num = toResort[i]; // 97
      if (num) {
        if (rule.length == 0) {
          const newRes = toResort.toSpliced(i, 1);
          newRes.push(num);
          makeReSort(newRes, rules);
          break;
        }
        if (!rule.includes(num)) {
          let index = i - 1;
          let changed = toResort[index];
          if (!changed) {
            return [-10];
          }
          let cop = toResort.toSpliced(index, 1, num);
          const newRes = cop.toSpliced(i, 1, changed);
          console.log("newres", newRes);
          makeReSort(newRes, rules);
          break;
        }
      }
    }
  }
  return [];
};

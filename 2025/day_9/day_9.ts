import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export const getRectangle = (f: number[], s: number[]): number => {
  // @ts-ignore
  const b = Math.abs((f[0] - s[0])) + 1;
  // @ts-ignore
  const a = Math.abs((f[1] - s[1])) + 1;
  return a * b
}

export const getChords = (data: string): number[][] => {
  const result: number[][] = [];
  const splited = data.split("\n").filter(n => n != "\n");
  for (const sp of splited) {
    const tmp = sp.split(",").map(n => Number(n.trim())).filter(n => n != 0);
    if (tmp.length > 0) {
      result.push(tmp);
    }
  }

  return result
}

export const getMaxRectangle = (chords: number[][]): number => {
  var max = 0;
  const length = chords.length;
  for (const ch of chords) {
    for (var i = 0; i < length; i++) {
      // @ts-ignore
      const res = getRectangle(ch, chords[i]);
      if (res > max) {
        max = res;
      }
    }
  }
  return max;
}

import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export const getRanges = (data: string): number[][] => {
  const splited = data.split('\n');
  const result: number[][] = [];
  for (var i = 0; i < splited.length; i++) {
    if (splited[i] == '') {
      break;
    }
    const rang = splited[i]?.split("-").map(Number) || [];
    result.push(rang)
  }
  return result
}

export const getItemsIDs = (data: string): number[] => {
  const splited = data.split('\n');
  const empty = splited.findIndex((elem => elem == ""))
  const result: number[] = []
  for (var i = empty + 1; i < splited.length - 1; i++) {
    result.push(Number(splited[i]))
  }
  return result
}

export const findFresh = (ranges: number[][], ids: number[]): number => {
  var result = 0;
  const calculated: number[] = [];
  for (const id of ids) {
    for (const rang of ranges) {
      var start = rang[0] || 0
      const end = rang[1] || 0
      if (id >= start && id <= end && !calculated.includes(id)) {
        result++;
        calculated.push(id)
        continue;
      }
    }
  }

  return result;
}

export const calcuateFreshes = (ranges: number[][]): number => {
  var result = 0;



  return result

}

import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export const buildMatrix = (data: string): string[][] => {
  const splited = data.split('\n');
  const result: string[][] = [];
  for (var i = 0; i < splited.length - 1; i++) {
    const rawRow = splited[i] || "";
    if (rawRow?.length == 0) {
      break
    }
    result.push(rawRow.split(""))
  }
  return result
}

export const findStart = (data: string[][]): number[] => {
  const len = data.length
  if (!data[0]) {
    return [-1, -1]
  }
  const colLen = data[0]?.length
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < colLen; j++) {
      const column = data[i]
      if (!column) {
        return [-1, -1]
      }
      if (column[j] === "S") {
        return [i, j]
      }
    }
  }
  return [-1, -1]
}

export const stepDown = (matrix: string[][], start: number[][]): [number[][], number] => {
  const len = matrix.length
  var splitCounter = 0;
  const result: number[][] = []
  if (!matrix[0]) {
    return [start, splitCounter]
  }

  const colLen = matrix[0]?.length

  for (const chord of start) {
    const startRow = (chord[0] || 0) + 1;
    const newStart = [startRow, chord[1]];
    const position = chord[1] || 0
    if (startRow >= len) {
      //@ts-ignore
      result.push(newStart)
      continue
    }
    if (!matrix[startRow]) {
      //@ts-ignore
      result.push(newStart)
      continue
    }
    if (matrix[startRow][position] === "^") {
      splitCounter += 1;
      const newLeft = position - 1;
      const newRight = position + 1;
      if (newLeft > 0 && newLeft < colLen - 1 && !alreadyContan(result, [startRow, newLeft])) {
        result.push([startRow, newLeft])
      }
      if (newRight > 0 && newRight < colLen - 1 && !alreadyContan(result, [startRow, newRight])) {
        result.push([startRow, newRight])
      }
    } else {
      //@ts-ignore
      if (!alreadyContan(result, newStart)) {
        //@ts-ignore
        result.push(newStart)
      }
      continue
    }

  }
  return [result, splitCounter]
}

export const alreadyContan = (arr: number[][], sub: number[]): boolean => {
  for (const a of arr) {
    if (a[0] == sub[0] && a[1] == sub[1]) {
      return true
    }
  }
  return false
}

export const calculate = (matrix: string[][]): number => {
  const start = findStart(matrix);
  var sum = 0;
  var newStep = stepDown(matrix, [start])

  for (var i = 0; i < matrix.length - 1; i++) {
    sum += newStep[1]
    newStep = stepDown(matrix, newStep[0])

  }
  return sum
}

import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export const getNumbersByCols = (data: string): [number[][], string[]] => {
  const splited = data.split('\n');
  const numbers: number[][] = [];
  const operand: string[] = [];

  for (const row of splited) {
    const tmp: number[] = [];
    const r = row.split(' ')
    for (const char of r) {
      if (char == "*" || char == "+") {
        operand.push(char);
        continue;
      }
      if (char != '') {
        tmp.push(Number(char));
      }
    }
    if (tmp.length > 0) {
      numbers.push(tmp)
    }
  }
  return [numbers, operand]
}

export const getNumbersAsString = (data: string, steps: number[]): Map<number, string[]> => {
  const splited = data.split('\n');
  const len = splited.length
  const result: string[][] = [];
  const mapResult = new Map();
  for (var row = 0; row < len; row++) {
    if (splited[row]?.includes("*")) {
      break;
    }
    // @ts-ignore
    result.push(sliceEveryNsymbols(splited[row], steps))
  }
  // @ts-ignore
  // go to the all number in row
  for (var row = 0; row < result.length; row++) {
    var arr: string[] = []
    // @ts-ignore
    // this is numbers // 17
    for (var number = 0; number < result[0]?.length; number++) {
      var tmp = "";
      var rowForNumber = result[row]; // 0, 1, 2, 3
      // @ts-ignore
      var nu = rowForNumber[number]; // 0, 1, 2, until 17
      // @ts-ignore
      for (let indexWordInNumber = 0; indexWordInNumber < nu.length; indexWordInNumber++) { // 0-4
        // @ts-ignore
        var n = nu[indexWordInNumber]
        if (n == " ") {
          n = "-"
        }
        tmp += n
      }
      arr.push(tmp)
    }
    mapResult.set(row, arr)

  }
  return mapResult;
}

export const sliceEveryNsymbols = (data: string, n: number[]): string[] => {
  const tmp = data.split("");
  const r: string[] = []
  var i = 0;
  var sliceStep = 0;
  while (i < tmp.length) {
    // @ts-ignore
    r.push(tmp.slice(i, i + n[sliceStep]))
    // @ts-ignore
    i += n[sliceStep] + 1;
    sliceStep++;
  }
  return r
}

export const calculate = (data: [number[][], string[]]): number => {
  const [numbers, operand] = data;
  const rows = numbers.length
  var sum = 0;
  for (var i = 0; i < operand.length; i++) {
    const op = operand[i]
    if (op == "*") {
      var mul_tmp = 1;
      for (var j = 0; j < rows; j++) {
        // @ts-ignore
        mul_tmp *= numbers[j][i];
      }
      sum += mul_tmp
    } else {
      var sum_tmp = 0;
      for (var j = 0; j < rows; j++) {
        // @ts-ignore
        sum_tmp += numbers[j][i];
      }
      sum += sum_tmp;
    }
  }
  return sum
}


export const getNumberInReverseOrder = (data: string[]): number[] => {
  var result: number[] = [];
  const numbers = new Map()
  for (var j = 0; j < data.length; j++) {
    // @ts-ignore
    const d = data[j];
    if (!d) {
      break;
    }
    // @ts-ignore
    for (var i = 0; i < d.length; i++) {
      // @ts-ignore
      if (d[i] === "-") {
        continue
      }
      const old = numbers.get(i)
      // @ts-ignore
      if (old) {
        // @ts-ignore
        numbers.set(i, old + d[i]);
      } else {
        // @ts-ignore
        numbers.set(i, d[i]);
      }
    }
  }
  for (const [_, value] of numbers) {
    result.push(Number(value))

  }
  return result
}

export const lengthLargesArray = (data: string[]): number => {
  var length = 0;
  for (const d of data) {
    if (d.length >= length) {
      length = d.length
    }
  }
  return length
}

export const calculateAsStrings = (data: Map<number, string[]>, operands: string[]): number => {
  const rows = data.size;
  var sum = 0;
  console.log(data)

  for (var i = 0; i < operands.length; i++) {
    const op = operands[i];
    var tmp: string[] = []
    //@ts-ignore
    for (var j = 0; j < rows; j++) {
      const d = data.get(j)
      //@ts-ignore
      tmp.push(d[i])
    }
    const numbers = getNumberInReverseOrder(tmp)
    if (numbers.length == 0) {
      break
    }
    if (op == "*") {
      sum += numbers.reduce((a, b) => a * b)
    } else {
      sum += numbers.reduce((a, b) => a + b)
    }
  }
  return sum;
}

export const getBoxSizes = (data: number[][]): number[] => {
  const result: number[] = []
  // @ts-ignore
  for (var i = 0; i < data[0]?.length; i++) {
    var max = 0;
    // @ts-ignore
    for (var j = 0; j < data.length; j++) {
      // @ts-ignore
      const number = data[j][i]?.toString().length;
      // @ts-ignore
      if (number > max) {
        // @ts-ignore
        max = number
      }
    }
    result.push(max)
  }

  return result
}

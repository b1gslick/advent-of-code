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

export const getNumbersAsString = (data: string): Map<number, string[]> => {
  const splited = data.split('\n');
  const result: string[][] = [];
  const mapResult = new Map();
  for (var i = 0; i < splited.length; i++) {
    if (splited[i]?.includes("*")) {
      break;
    }
    // @ts-ignore
    result.push(sliceEveryNsymbols(splited[i], 3))
  }
  // @ts-ignore
  var len = result[0]?.length;
  // @ts-ignore
  for (var i = 0; i < len - 1; i++) {
    // @ts-ignore
    var arr: string[] = []
    // @ts-ignore
    for (var number = 0; number < len; number++) {
      var tmp = "";
      var resI = result[i] || []
      var numb = resI[number] || []
      for (let index = 0; index < numb.length; index++) {
        // @ts-ignore
        var n = result[i][number][index]
        if (n == " ") {
          n = "-"
        }
        tmp += n
      }
      arr.push(tmp)
    }
    mapResult.set(i, arr)

  }
  return mapResult;
}

export const sliceEveryNsymbols = (data: string, n: number): string[] => {
  const tmp = data.split("");
  const result: string[] = []
  var i = 0;
  while (i < data.length) {
    // @ts-ignore
    result.push(tmp.slice(i, i + n))
    i += n + 1;
  }
  return result
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

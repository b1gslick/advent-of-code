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

export const getNumbersAsString = (data: string): string[][] => {
  const splited = data.split('\n');
  const result: string[][] = [];
  for (const row of splited) {
    const tmp: string[] = [];
    const r = row.split(' ')
    for (const char of r) {
      if (char == "*" || char == "+") {
        break;
      }
      if (char != '') {
        tmp.push(char);

      }
    }
    if (tmp.length > 0) {
      result.push(tmp)
    }
  }
  return result;
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

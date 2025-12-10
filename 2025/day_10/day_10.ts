import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export const getSchemaButtons = (data: string): number[][] => {
  // [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
  const splited = data.split("\n");
  const result: any = [];

  for (const sp of splited) {
    const buttons: any = [];
    var schema: any = [];
    const tmp = sp.split(" ")
    for (const line of tmp) {
      if (line.includes("[")) {
        schema = line.replaceAll("[", "").replaceAll("]", "").split("").map(a => {
          if (a == '.') {
            a = '0';
          } else {
            a = '1';
          }
          return Number(a);
        })
      } else if (line.includes("(")) {
        const tmp = line.replaceAll("(", "").replaceAll(")", "").split(",").map(a => Number(a))
        if (tmp.length > 0) {
          buttons.push(tmp)
        }
      }


    }
    if (schema.length > 0 && buttons.length > 0) {
      result.push([schema, buttons])
    }
  }

  return result;
}


export const press = (sc: number[], button: number[]): number[] => {
  for (const b of button) {
    // @ts-ignore
    sc[b] ^= 1;
  }
  return sc;
}

export const findVariants = (line: any): number[][] => {
  const result: any = [];
  const schema = line[0];
  const buttons = addNTimesButton(line[1], 1);
  // const comb = combinations(buttons)
  const comb = get(buttons);
  for (const c of comb) {
    var base: any = new Array(schema.length).fill(0);
    for (const b of c) {
      base = press(base, b);
    }
    if (compareArrays(base, schema)) {
      result.push(c)
    }
  }
  return result;
}

export const getSum = (data: any): number => {
  var sum = 0;
  for (const d of data) {
    sum += lessLength(findVariants(d));
  }

  return sum;
}

export const lessLength = (data: any): number => {
  var len = data.length
  for (const d of data) {
    if (d.length == 0) {
      continue
    }
    if (d.length < len) {
      len = d.length
    }
  }
  return len;
}

const compareArrays = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  else {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
};

export const addNTimesButton = (buttons: any, times: number): number[][] => {
  const result: number[][] = []
  for (var i = 0; i < buttons.length; i++) {
    result.push(buttons[i])
    if (buttons[i].length < 5) {
      for (var j = 0; j < times; j++) {
        result.push(buttons[i])
      }
    }
  }
  return result;
}


const combinations = (elements: any) => {
  if (elements.length == 1) {
    return [elements];
  } else {
    const tail: any = combinations(elements.slice(1));
    return tail.reduce(
      (combos: any, combo: any) => { combos.push([elements[0], ...combo]); return combos; },
      [[elements[0]], ...tail]
    );
  }
};

function get(arr: any) {
  const res = [];
  const total = Math.pow(2, arr.length);

  for (let i = 1; i < total; i++) {
    const comb = [];
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        comb.push(arr[j]);
      }
    }
    res.push(comb);
  }
  return res
}

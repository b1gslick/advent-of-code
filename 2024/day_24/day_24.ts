import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();

  return file;
};

export type Conditions = {
  left: string;
  right: string;
  operator: string;
  result: string;
};

export type ParsedData = {
  gates: Record<string, number>;
  conditions: Conditions[];
};

export const parseData = (data: string): ParsedData => {
  let pd: ParsedData = { gates: {}, conditions: [] };

  const temp = data.split("\n\n");

  //@ts-ignore
  for (let cont of temp[0]?.split("\n")) {
    let s = cont.split(":");
    //@ts-ignore
    let value = parseInt(s[1]);
    //@ts-ignore
    pd.gates[s[0]] = value;
  }

  //@ts-ignore
  for (let c of temp[1]?.split("\n")) {
    let v = c.split(" ");
    if (v.length > 1) {
      let cond: Conditions = {
        //@ts-ignore
        left: v[0],
        //@ts-ignore
        right: v[2],
        //@ts-ignore
        operator: v[1],
        //@ts-ignore
        result: v[4],
      };
      pd.conditions.push(cond);
    }
  }

  return pd;
};

export const applyOperand = (
  left: number,
  right: number,
  op: string,
): number => {
  switch (op) {
    case "AND":
      return left & right;
    case "OR":
      return left | right;
    case "XOR":
      return left ^ right;
  }
  return -1;
};

const getBinaryStringFromZ = (data: Record<string, number>): string => {
  let sortZ: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (key.includes("z") && /\d+/.test(key)) {
      //@ts-ignore
      let number = parseInt(key.match(/\d+/)[0]);
      //@ts-ignore
      sortZ[number] = value;
    }
  }
  let res = "";
  for (const ch of sortZ.reverse()) {
    res += ch;
  }
  return res;
};

const meetConditions = (
  left: string,
  right: string,
  gates: Record<string, number>,
  tempRes: Record<string, number>,
): boolean => {
  const gatesK = Object.keys(gates);
  const tempK = Object.keys(tempRes);

  return (
    (gatesK.includes(left) || tempK.includes(left)) &&
    (gatesK.includes(right) || tempK.includes(right))
  );
};

export const calculate = (data: ParsedData): number => {
  let conditions = data.conditions;
  const tempRes: Record<string, number> = {};
  while (conditions.length > 0) {
    for (const ev of conditions) {
      //@ts-ignore
      if (meetConditions(ev.left, ev.right, data.gates, tempRes)) {
        const gatesK = Object.keys(data.gates);

        let left = gatesK.includes(ev.left)
          ? data.gates[ev.left]
          : tempRes[ev.left];
        let right = gatesK.includes(ev.right)
          ? data.gates[ev.right]
          : tempRes[ev.right];

        tempRes[ev.result] = applyOperand(
          //@ts-ignore
          left,
          right,
          ev.operator,
        );
        conditions = conditions.filter((val) => val != ev);
      }
    }
  }
  //@ts-ignore
  let arr = getBinaryStringFromZ(tempRes);

  //@ts-ignore
  return parseInt(arr, 2);
};

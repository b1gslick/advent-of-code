import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();

  return file;
};

export type Data = {
  grid: string[][];
  steps: string;
};

export const parseData = (data: string): Data => {
  const temp = data.split("\n\n");
  let final_grid = [];
  let grid = temp[0]?.split("\n") || [];
  for (let gr of grid) {
    let t = gr.split("");
    final_grid.push(t);
  }
  let steps = temp[1]?.replaceAll("\n", "").trim() || "";
  return { grid: final_grid, steps: steps };
};

export const getStartPosition = (map: string[][]): number[] => {
  for (let i = 0; i < map.length; i++) {
    if (!map[i]) {
      return [0, 0];
    }
    let length = map[0]?.length || 0;
    for (let j = 0; j < length; j++) {
      const insisde = map[i] || [];
      if (insisde[j] == "@") {
        return [i, j];
      }
    }
  }
  return [0, 0];
};

const moveV: Record<string, number> = {
  "^": -1,
  v: 1,
};

const moveH: Record<string, number> = {
  ">": 1,
  "<": -1,
};

export const getNewGrid = (data: Data): string[][] => {
  const start = getStartPosition(data.grid);
  let grid = data.grid;
  let r = start[0];
  let c = start[1];
  for (let step of data.steps) {
    let dr = moveV[step] || 0;
    let dc = moveH[step] || 0;
    let targets = [start];
    let cr = r;
    let cc = c;
    let go = true;
    while (true) {
      //@ts-ignore
      cr += dr;
      //@ts-ignore
      cc += dc;
      //@ts-ignore
      let char = grid[cr][cc];
      if (char == "#") {
        go = false;
        break;
      }
      if (char == "O") {
        //@ts-ignore
        targets.push([cr, cc]);
      }
      if (char == ".") {
        break;
      }
    }
    if (!go) {
      continue;
    }
    //@ts-ignore
    grid[r][c] = ".";
    //@ts-ignore
    grid[r + dr][c + dc] = "@";

    for (const box of targets.slice(1, targets.length)) {
      //@ts-ignore
      grid[box[0] + dr][box[1] + dc] = "O";
    }
    //@ts-ignore
    r += dr;
    //@ts-ignore
    c += dc;
  }

  return grid;
};

export const calculateGPS = (grid: string[][]): number => {
  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    //@ts-ignore
    for (let j = 0; j < grid[0]?.length; j++) {
      //@ts-ignore
      if (grid[i][j] == "O") {
        result += 100 * i + j;
      }
    }
  }
  return result;
};

import * as fs from "fs";

export const readData = (path: string): string => {
  const file = fs.readFileSync(path).toString();
  return file;
};

export type Shape = {
  index?: number,
  shapes?: number[][],
}

export type Present = {
  size?: number[],
  fits?: number[],
}

export const getTestData = (data: string): [Shape[], Present[]] => {
  const shapes: Shape[] = [];
  const presents: Present[] = [];
  const s = data.slice(0, 95).split("\n").map(x => x.replaceAll(":", ""));
  const p = data.slice(95, data.length).split("\n").filter(x => x !== "").map(x => x.replaceAll(":", ""));


  var newS: Shape = { index: -1, shapes: [] }
  for (const l of s) {
    if (!(l.length > 0)) {
      shapes.push(structuredClone(newS))
      newS.index = -1
      newS.shapes = []
    }

    else if (!Object.is(Number(l), NaN)) {
      newS.index = Number(l)
    } else {
      var tmp = []
      for (const ch of l) {
        if (ch === "#") {
          tmp.push(1)
        } else {
          tmp.push(0)
        }

      }
      newS.shapes?.push(tmp)

    }
  }

  for (const pre of p) {
    var present: Present = { fits: [], size: [] }
    for (const s of pre.split(" ")) {
      if (s.includes("x")) {
        var tmp: any[] = s.split("x").filter(x => x !== "x")
        present.size = [Number(tmp[0]), Number(tmp[1])]
      } else {
        present.fits?.push(Number(s))
      }
    }
    presents.push(present)
  }
  return [shapes, presents]
}

export const rotateMatrix = (mat: number[][], side: "l" | "r"): number[][] => {
  const n = mat.length;

  const res = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (side == "l") {
        var index = n - j - 1
        var index2 = i
      } else {
        var index = j
        var index2 = n - i - 1
      }
      // @ts-ignore
      res[index][index2] = mat[i][j];
    }
  }
  return res
}

export const flip = (mat: number[][], side: "h" | "v"): number[][] => {
  const n = mat.length;
  const res: any = Array.from({ length: n }, () => Array(n).fill(0));

  if (side == 'h') {
    res[0] = structuredClone(mat[2])
    res[1] = structuredClone(mat[1])
    res[2] = structuredClone(mat[0])
  } else {
    res[0] = structuredClone(mat[0])
    res[1] = structuredClone(mat[1])
    res[2] = structuredClone(mat[2])
    // @ts-ignore
    res[0][0] = structuredClone(mat[0][2])
    // @ts-ignore
    res[0][2] = structuredClone(mat[0][0])
    // @ts-ignore
    res[1][0] = structuredClone(mat[1][2])
    // @ts-ignore
    res[1][2] = structuredClone(mat[1][0])
    // @ts-ignore
    res[2][0] = structuredClone(mat[2][2])
    // @ts-ignore
    res[2][2] = structuredClone(mat[2][0])
  }

  return res;
}

export const getFit = (shape: Shape, present: Present, matrix: number[][]): boolean => {
  // @ts-ignore
  // @ts-ignore
  var numbers = 4 + 4 + 4 + 2 + 2 + (present.size[0] - 1) + (present.size[0] - 1)
  var sh = shape.shapes

  while (numbers > 0) {
    numbers--;
    // @ts-ignore
    if (!putObject(sh, matrix)) {
      // @ts-ignore
      sh = flip(sh, "h")
    }

  }

  return false
}

export const putObject = (shape: number[][], matrix: number[][]): [number[][], boolean] => {
  const rows = shape.length
  const cols = shape[0]?.length
  var answer = false
  if (!cols) {
    return [matrix, answer];
  }

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      // @ts-ignore
      if (matrix[r][c] !== 1) {
        // @ts-ignore
        matrix[r][c] = shape[r][c]
        answer = true
      } else {
        answer = false
      }
    }
  }



  return [matrix, answer]
}

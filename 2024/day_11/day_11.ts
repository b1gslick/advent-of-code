export const make_blink = (stones: string): string => {
  let arr_s = stones.split(" ");
  let answer = [];

  for (const stone of arr_s) {
    if (stone.length % 2 == 0) {
      let mid = stone.length / 2;
      let left = stone.slice(0, mid);
      let right = stone.slice(mid);
      if (parseInt(left) == 0) {
        left = "0";
      }
      if (parseInt(right) == 0) {
        right = "0";
      }
      answer.push(parseInt(left).toString());
      answer.push(parseInt(right).toString());
    } else if (parseInt(stone) == 0) {
      answer.push("1");
    } else {
      answer.push((parseInt(stone) * 2024).toString());
    }
  }
  return answer.join(" ");
};

export const blinks = (stones: string, times: number): string => {
  if (times == 0) {
    return stones;
  }
  times -= 1;
  return blinks(make_blink(stones), times);
};

export const blinks_no_rec = (tones: string, times: number): number => {
  for (let i = 0; i < times; i++) {
    tones = make_blink(tones);
  }
  return tones.split(" ").length;
};

export const blind_divede = (stones: string, times: number): number => {};

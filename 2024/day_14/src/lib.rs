use std::{
    collections::HashMap,
    fs::File,
    i64,
    io::{self, BufRead, BufReader},
    path::Path,
    vec,
};

use regex::Regex;

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn parse_data(data: Vec<String>) -> HashMap<i32, HashMap<String, Vec<i64>>> {
    let mut result = HashMap::new();
    let re = Regex::new(r"(-?[\d]+)").unwrap();

    for (i, line) in data.iter().enumerate() {
        let mut temp = HashMap::new();
        let captures: Vec<i64> = re
            .find_iter(line)
            // try to parse the string matches as i64 (inferred from fn type signature)
            // and filter out the matches that can't be parsed (e.g. if there are too many digits to store in an i64).
            .filter_map(|digits| digits.as_str().parse().ok())
            // collect the results in to a Vec<i64> (inferred from fn type signature)
            .collect();
        temp.insert("p".to_string(), vec![captures[0], captures[1]]);
        temp.insert("v".to_string(), vec![captures[2], captures[3]]);
        result.insert(i as i32, temp);
    }

    result
}

fn cacluate_final_afte_seconds(
    ponts: HashMap<String, Vec<i64>>,
    square: (i64, i64),
    seconds: i64,
) -> (i64, i64) {
    let raw_x = ponts["p"][0] + (ponts["v"][0] * seconds);
    let raw_y = ponts["p"][1] + (ponts["v"][1] * seconds);
    let mut x = if raw_x % square.0 > 0 {
        raw_x % square.0
    } else {
        square.0 + (raw_x % square.0)
    };
    let mut y = if raw_y % square.1 > 0 {
        raw_y % square.1
    } else {
        square.1 + (raw_y % square.1)
    };
    if x == square.0 {
        x -= square.0;
    }
    if y == square.1 {
        y -= square.1
    }
    (x, y)
}

fn get_final_position(
    ponts: HashMap<i32, HashMap<String, Vec<i64>>>,
    square: (i64, i64),
    seconds: i64,
) -> Vec<(i64, i64)> {
    let result: Vec<(i64, i64)> = ponts
        .into_values()
        .map(|x| cacluate_final_afte_seconds(x, square, seconds))
        .collect();
    result
}

fn get_safty_factor(position: Vec<(i64, i64)>, square: (i64, i64)) -> i64 {
    let dead_zone = (square.0 / 2, square.1 / 2);
    let mut q1 = 0;
    let mut q2 = 0;
    let mut q3 = 0;
    let mut q4 = 0;

    for pos in position {
        if pos.0 < dead_zone.0 && pos.1 < dead_zone.1 {
            q1 += 1;
        }
        if pos.0 > dead_zone.0 && pos.1 < dead_zone.1 {
            q2 += 1;
        }
        if pos.0 < dead_zone.0 && pos.1 > dead_zone.1 {
            q3 += 1;
        }
        if pos.0 > dead_zone.0 && pos.1 > dead_zone.1 {
            q4 += 1;
        }
    }
    q1 * q2 * q3 * q4
}

#[cfg(test)]
mod tests {
    use super::*;
    use parameterized::parameterized;

    #[test]
    fn it_works() {
        let data: Vec<String> = lines_from_file("example.txt").unwrap();
        assert!(!data.as_slice().is_empty());
    }

    #[test]
    fn parse_data_test() {
        let parsed = get_test_data("example.txt");
        let mut want = HashMap::new();
        want.insert("p".to_string(), vec![0, 4]);
        want.insert("v".to_string(), vec![3, -3]);
        assert_eq!(parsed[&0], want);
    }

    #[parameterized(steps = {
        1, 2, 3, 4, 5, 6, 100
    }, expetected = {(4, 1), (6, 5), (8, 2), (10, 6), (1, 3), (3, 0), (4,5)
    })]
    fn calculated_final_destination_after_step(steps: i64, expetected: (i64, i64)) {
        let parsed = get_test_data("example.txt")[&10].clone();
        let final_step = cacluate_final_afte_seconds(parsed, (11, 7), steps);
        assert_eq!(final_step, expetected);
    }

    #[test]
    fn get_position_for_all_robots() {
        let parsed = get_test_data("example.txt");
        let final_positions = get_final_position(parsed, (11, 7), 100);
        let safety_factor = get_safty_factor(final_positions, (11, 7));
        assert_eq!(safety_factor, 12);
    }

    #[test]
    fn get_safty() {
        let parsed = get_test_data("real.txt");
        let final_positions = get_final_position(parsed, (101, 103), 100);
        let safety_factor = get_safty_factor(final_positions, (101, 103));
        assert_eq!(safety_factor, 222208000);
    }

    fn get_test_data(path: &str) -> HashMap<i32, HashMap<String, Vec<i64>>> {
        parse_data(lines_from_file(path).unwrap())
    }
}

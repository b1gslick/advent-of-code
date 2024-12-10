use std::{
    collections::{HashSet, VecDeque},
    fs::File,
    hash::Hash,
    i32,
    io::{self, BufRead, BufReader},
    path::Path,
    usize,
};

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn get_array(for_array: &Vec<String>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    for string in for_array {
        let mut temp = vec![];
        for char in string.as_bytes() {
            let number = char - 48;
            temp.push(number as i32);
        }
        result.push(temp);
    }
    result
}

fn get_zeros(arr: &Vec<Vec<i32>>) -> Vec<(i32, i32)> {
    let mut result = vec![];
    for n_i in 0..arr.len() {
        let nested = &arr[n_i];
        for n_j in 0..nested.len() {
            if nested[n_j] == 0 {
                result.push((n_i as i32, n_j as i32));
            }
        }
    }
    result
}

fn get_paths(arr: &Vec<Vec<i32>>, r: i32, c: i32) -> i32 {
    let mut queue = VecDeque::from([(r, c)]);
    let mut seen = HashSet::from([(r, c)]);
    let mut sum = 0;
    let rows = arr.len();
    let cols = arr[0].len();
    loop {
        if !(queue.len() > 0) {
            break;
        }
        let position = queue.pop_front().unwrap();
        for cur_pos in [
            (position.0 - 1, position.1),
            (position.0, position.1 + 1),
            (position.0 + 1, position.1),
            (position.0, position.1 - 1),
        ] {
            if cur_pos.0 < 0
                || cur_pos.1 < 0
                || cur_pos.0 >= rows as i32
                || cur_pos.1 >= cols as i32
            {
                continue;
            }
            if arr[cur_pos.0 as usize][cur_pos.1 as usize]
                != arr[position.0 as usize][position.1 as usize] + 1
            {
                continue;
            }

            if seen.contains(&cur_pos) {
                continue;
            }
            seen.insert(cur_pos);
            if arr[cur_pos.0 as usize][cur_pos.1 as usize] == 9 {
                sum += 1;
            } else {
                queue.push_back(cur_pos);
            }
        }
    }
    sum
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn read_data() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        assert_eq!(data, ["0123", "1234", "8765", "9876"]);
    }

    #[test]
    fn build_2d_array() {
        let array_2d = get_data("./example.txt");
        assert_eq!(
            array_2d,
            [[0, 1, 2, 3], [1, 2, 3, 4], [8, 7, 6, 5], [9, 8, 7, 6]]
        );
    }

    #[test]
    fn find_path_from_example() {
        let array_2d = get_data("./example.txt");
        let zeros = get_zeros(&array_2d);
        let mut sum = 0;
        for zero in zeros {
            sum += get_paths(&array_2d, zero.0, zero.1);
        }
        assert_eq!(sum, 1);
    }
    #[test]
    fn find_path_from_large() {
        let array_2d = get_data("./large.txt");
        let zeros = get_zeros(&array_2d);
        let mut sum = 0;
        for zero in zeros {
            sum += get_paths(&array_2d, zero.0, zero.1);
        }
        assert_eq!(sum, 36);
    }
    #[test]
    fn find_path_from_real() {
        let array_2d = get_data("./real.txt");
        let zeros = get_zeros(&array_2d);
        let mut sum = 0;
        for zero in zeros {
            sum += get_paths(&array_2d, zero.0, zero.1);
        }
        assert_eq!(sum, 617);
    }

    fn get_data(filename: impl AsRef<Path>) -> Vec<Vec<i32>> {
        let data: Vec<String> = lines_from_file(filename).unwrap();
        get_array(&data)
    }
}

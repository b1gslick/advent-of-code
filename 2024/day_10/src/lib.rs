use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
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

fn get_paths(arr: &Vec<Vec<i32>>) -> i32 {
    let dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)];
    let mut dir = 0;

    let zeros = get_zeros(arr);

    0
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
        let paths = get_paths(&array_2d);
        assert_eq!(paths, 1);
    }

    fn get_data(filename: impl AsRef<Path>) -> Vec<Vec<i32>> {
        let data: Vec<String> = lines_from_file(filename).unwrap();
        get_array(&data)
    }
}

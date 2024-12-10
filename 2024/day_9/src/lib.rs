use std::{
    char,
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
    u64,
};

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn get_disk_lines(lines: Vec<String>) -> usize {
    let mut result: String = "".to_string();
    let mut files: Vec<i32> = vec![];
    let mut empties: Vec<i32> = vec![];
    for (index, char) in lines[0].chars().enumerate() {
        if index % 2 == 0 {
            files.push(char as i32 - 48);
        } else {
            empties.push(char as i32 - 48);
        }
    }
    let lenth = if files.len() > empties.len() {
        files.len()
    } else {
        empties.len()
    };
    println!("{}", lenth);
    for i in 0..lenth {
        for _ in 0..files[i] {
            let str_num = i.to_string();
            for ch in str_num.as_bytes() {
                result.push(char::from_digit((ch - 48) as u32, 10).unwrap())
            }
        }
        if empties.len() > i {
            let space = empties[i];
            for _ in 0..space {
                result.push('.');
            }
        }
    }

    let mut end_index = result.len() - 1;
    let mut tru_res = vec![];
    for i in 0..result.len() {
        if result.as_bytes()[i] == 46 {
            if end_index <= i {
                break;
            }
            while result.as_bytes()[end_index] == 46 {
                end_index -= 1;
            }
            let char = result.as_bytes()[end_index] - 48;
            end_index -= 1;
            tru_res.push(char)
        } else {
            tru_res.push(result.as_bytes()[i] - 48);
        }
        if end_index <= i {
            break;
        }
    }
    let mut count = 0;
    for i in 0..tru_res.len() {
        count += i * tru_res[i] as usize;
    }
    count
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let lines: Vec<String> = lines_from_file("./example.txt").unwrap();
        assert!(!lines.is_empty());
    }

    #[test]
    fn parse_first_example() {
        let lines: Vec<String> = lines_from_file("first.txt").unwrap();
        assert_eq!(get_disk_lines(lines), 60);
    }

    #[test]
    fn parse_second_example() {
        let lines: Vec<String> = lines_from_file("example.txt").unwrap();
        assert_eq!(get_disk_lines(lines), 1928);
    }
    #[test]
    fn parse_real() {
        let lines: Vec<String> = lines_from_file("real1").unwrap();

        assert_eq!(get_disk_lines(lines), 6384282079460);
    }
}

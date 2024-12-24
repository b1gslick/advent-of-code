use std::{
    collections::HashSet,
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
    usize,
};

use queue::*;

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn get_2d(data: Vec<String>) -> Vec<Vec<String>> {
    data.into_iter()
        .map(|x| {
            x.split("")
                .filter(|&x| !x.is_empty())
                .map(|x| x.to_string())
                .collect()
        })
        .collect()
}

#[derive(Clone)]
struct DataAndChord {
    x: i64,
    y: i64,
    p: i64,
}

fn get_simple_path(data: Vec<Vec<String>>) -> i64 {
    let mut q: Queue<DataAndChord> = Queue::new();
    let mut seen: HashSet<(i64, i64)> = HashSet::new();
    let start = get_start(&data);
    let finish = get_finish(&data);

    let row = data.len();
    let cols = data[0].len();

    let _ = q.queue(DataAndChord {
        x: start.0,
        y: start.1,
        p: 0,
    });

    while !q.is_empty() {
        let current = q.dequeue().unwrap();

        for chord in [
            (current.x - 1, current.y),
            (current.x + 1, current.y),
            (current.x, current.y - 1),
            (current.x, current.y + 1),
        ] {
            if chord.0 < 0 || chord.1 < 0 || chord.0 >= row as i64 || chord.1 >= cols as i64 {
                continue;
            }
            if data[chord.0 as usize][chord.1 as usize] == "#" {
                continue;
            }
            if seen.contains(&chord) {
                continue;
            }
            if chord == finish {
                return current.p + 1;
            }
            seen.insert(chord);
            let _ = q.queue(DataAndChord {
                x: chord.0,
                y: chord.1,
                p: current.p + 1,
            });
        }
    }

    0
}

fn get_start(data: &[Vec<String>]) -> (i64, i64) {
    for i in 0..data.len() {
        for j in 0..data[0].len() {
            if data[i][j] == "S" {
                return (i as i64, j as i64);
            }
        }
    }
    (-1, -1)
}

fn get_finish(data: &[Vec<String>]) -> (i64, i64) {
    for i in 0..data.len() {
        for j in 0..data[0].len() {
            if data[i][j] == "E" {
                return (i as i64, j as i64);
            }
        }
    }
    (-1, -1)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = lines_from_file("./example.txt").unwrap();
        assert_eq!(result.len(), 15);
        assert_eq!(result[0].len(), 15);
    }

    #[test]
    fn make_2d_array() {
        let result = get_2d(lines_from_file("./example.txt").unwrap());
        assert_eq!(result[3][1], "S".to_string());
    }

    #[test]
    fn test_get_start() {
        let result = get_2d(lines_from_file("./example.txt").unwrap());
        let start = get_start(&result);
        assert_eq!(start, (3, 1));
    }

    #[test]
    fn test_get_finish() {
        let result = get_2d(lines_from_file("./example.txt").unwrap());
        let finish = get_finish(&result);
        assert_eq!(finish, (7, 5))
    }

    #[test]
    fn find_path() {
        let result = get_2d(lines_from_file("./example.txt").unwrap());
        let steps = get_simple_path(result);
        assert_eq!(steps, 84)
    }
}

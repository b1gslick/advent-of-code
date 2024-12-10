use std::collections::HashSet;
use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
};

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn construct_vec(lines: Vec<String>) -> Vec<Vec<String>> {
    let mut result: Vec<Vec<String>> = vec![];
    for line in lines.iter() {
        let mut temp: Vec<String> = vec![];

        for l in line.split("") {
            if !l.trim().is_empty() {
                temp.push(l.to_string())
            }
        }
        result.push(temp);
    }
    result
}

fn find_me(map: &Vec<Vec<String>>) -> Option<(i32, i32)> {
    for n_i in 0..map.len() {
        let nested = &map[n_i];
        for n_j in 0..nested.len() {
            if nested[n_j] == "^" {
                return Some((n_i as i32, n_j as i32));
            }
        }
    }
    None
}

pub fn get_point(map: &Vec<Vec<String>>, chord: (i32, i32)) -> usize {
    let dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)];
    let mut dir = 0;
    let w = map[0].len();
    let h = map.len();
    let mut chords: HashSet<(i32, i32)> = HashSet::new();
    let mut r = chord.0;
    let mut c = chord.1;
    let mut me = (r, c);
    loop {
        chords.insert(me);
        r = me.0 + dirs[dir].0;
        c = me.1 + dirs[dir].1;

        if !(0 <= r && r < h as i32 && 0 <= c && c < w as i32) {
            break;
        }
        let curchar = map[r as usize][c as usize].clone();
        if curchar == "." || curchar == "^" {
            me = (r, c);
        } else {
            dir = (dir + 1) % 4;
        }
    }
    chords.len()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn find_currator() {
        let map = get_data();
        let my_chords = find_me(&map);
        assert_eq!(my_chords.unwrap(), (6, 4));
    }

    #[test]
    fn find_first_path() {
        let map = get_data();
        let my_chords = find_me(&map);
        assert_eq!(get_point(&map, my_chords.unwrap()), 41);
    }

    fn get_data() -> Vec<Vec<String>> {
        let lines =
            lines_from_file("/Users/sergei.timokhin/Private/advent-of-code/2024/day_6/input.txt")
                // lines_from_file("/Users/sergei.timokhin/Private/advent-of-code/2024/day_6/example.txt")
                .expect("no such files");
        construct_vec(lines)
    }
}

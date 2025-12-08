use std::collections::HashSet;
use std::f64;
use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
};

#[derive(Debug, PartialEq, Clone)]
pub struct Chords {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

impl Chords {
    pub fn is_equal(&self, other: &Chords) -> bool {
        if self.x.partial_cmp(&other.x).unwrap().is_eq()
            && self.y.partial_cmp(&other.y).unwrap().is_eq()
            && self.z.partial_cmp(&other.z).unwrap().is_eq()
        {
            return true;
        }
        false
    }
}

pub fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

pub fn get_chords(data: &Vec<String>) -> Vec<Chords> {
    let mut result = vec![];
    for string in data {
        let temp: Vec<f64> = string
            .split(',')
            .map(|x| x.parse::<f64>().unwrap())
            .collect();
        result.push(Chords {
            x: temp[0],
            y: temp[1],
            z: temp[2],
        });
    }

    return result;
}

pub fn get_euclidean_distance(p: &Chords, q: &Chords) -> f64 {
    let x = q.x - p.x;
    let y = q.y - p.y;
    let z = q.z - p.z;

    let square_sum = x.powf(2.0) + y.powf(2.0) + z.powf(2.0);

    return square_sum.sqrt();
}

pub fn find_closed_object(boxes: &Vec<Chords>, target: usize) -> usize {
    let target_chord = &boxes[0];
    let mut distance = (target, 100_000_100.0f64);
    for (i, ch) in boxes.iter().enumerate() {
        if i <= target {
            continue;
        }
        let d = get_euclidean_distance(target_chord, ch);
        if d < distance.1 {
            distance.1 = d;
            distance.0 = i;
        }
    }
    return distance.0;
}

pub fn distance_pair(boxes: &Vec<Chords>) -> Vec<(&Chords, &Chords)> {
    let mut result = vec![];
    for ch in boxes.iter() {
        for i in 0..boxes.len() {
            let x = get_euclidean_distance(&ch, &boxes[i]);
            if x > 0.0 {
                result.push((x, (ch, &boxes[i])));
            }
        }
    }
    result.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
    let mut chords = vec![];
    for r in result {
        chords.push(r.1.clone());
    }
    return chords;
}

pub fn get_closes_pair(boxes: &Vec<Chords>) -> Vec<Vec<f64>> {
    let mut result: Vec<Vec<f64>> = vec![];
    for ch in boxes.iter() {
        let mut tmp = vec![];
        for i in 0..boxes.len() {
            tmp.push(get_euclidean_distance(&ch, &boxes[i]));
        }
        result.push(tmp);
    }
    result
}

pub fn get_nearest_object(data: &Vec<f64>) -> usize {
    let mut big = 100000000.0;
    let mut result: usize = 0;
    for (i, d) in data.iter().enumerate() {
        if *d < big && *d != 0.0 {
            big = *d;
            result = i;
        }
    }
    result
}

pub fn get_pairs(boxes: &Vec<Chords>, all_pairs: &Vec<Vec<f64>>) -> Vec<(Chords, Chords)> {
    let mut result = vec![];
    for (i, ch) in boxes.iter().enumerate() {
        let smallest_index = get_nearest_object(&all_pairs[i]);
        let pair = (ch.clone(), boxes[smallest_index].clone());
        // if !contais_pair(&result, &pair) {
        result.push(pair);
        // }
    }
    result
}

pub fn sort_pairs_order_by_distance(pairs: &Vec<(Chords, Chords)>) -> Vec<(Chords, Chords)> {
    let mut res: Vec<(usize, f64)> = vec![];
    let mut chords: Vec<(Chords, Chords)> = vec![];
    for (i, p) in pairs.iter().enumerate() {
        res.push((i, get_euclidean_distance(&p.0, &p.1)));
    }
    res.sort_by(|a, b| a.1.partial_cmp(&b.1).unwrap());
    for r in res {
        chords.push(pairs[r.0].clone());
    }
    chords
}

pub fn contais_pair(arr: &Vec<(Chords, Chords)>, pair: &(Chords, Chords)) -> bool {
    for p in arr {
        if p.0.is_equal(&pair.1) || p.1.is_equal(&pair.0) {
            return true;
        }
    }
    false
}

pub fn get_index_for_chords(boxes: &Vec<Chords>, chord: &Chords) -> usize {
    for (i, ch) in boxes.iter().enumerate() {
        if ch == chord {
            return i;
        }
    }
    return usize::MAX;
}

pub fn get_nested_array(target: usize, nested: &HashSet<Vec<usize>>) -> Vec<usize> {
    let result: Vec<usize> = vec![];
    if nested.is_empty() {
        return result;
    }
    for n in nested {
        if n.is_empty() {
            return result;
        }
        if n.contains(&target) {
            return n.to_vec();
        }
    }
    return result;
}

pub fn get_circuits(
    boxes: &Vec<Chords>,
    all_pairs: &Vec<(&Chords, &Chords)>,
    times: i32,
) -> HashSet<Vec<usize>> {
    let mut result: HashSet<Vec<usize>> = HashSet::new();

    let mut i = 0;

    for pair in all_pairs {
        if i >= times {
            break;
        }
        i += 1;
        let f_i = get_index_for_chords(boxes, &pair.0);
        let s_i = get_index_for_chords(boxes, &pair.1);
        let mut f_array = get_nested_array(f_i, &result);
        let mut s_array = get_nested_array(s_i, &result);
        if f_array.is_empty() && s_array.is_empty() {
            result.insert([f_i, s_i].to_vec());
        } else {
            if f_array.is_empty() {
                result.remove(&s_array);
                result.remove(&f_array);
                s_array.push(f_i);
                result.insert(s_array);
            } else if s_array.is_empty() {
                result.remove(&f_array);
                result.remove(&s_array);
                f_array.push(s_i);
                result.insert(f_array);
            } else if f_array != s_array {
                result.remove(&f_array);
                result.remove(&s_array);
                f_array.extend_from_slice(&s_array);
                result.insert(f_array);
            } else {
                println!("not handled f{:?} s{:?}", f_array, s_array);
            }
        }
    }
    return result;
}

pub fn calcuate_sum(nested: &HashSet<Vec<usize>>) -> usize {
    let mut nested_array = vec![];
    let mut mul = 1;
    for n in nested {
        nested_array.push(n);
    }
    nested_array.sort_by(|a, b| b.len().cmp(&a.len()));
    println!("{:?}", nested_array);

    for i in 0..3 {
        mul *= nested_array[i].len();
    }
    return mul;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_distance_pair() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let dp = distance_pair(&array_with_chords);
        assert_ne!(dp.len(), 0);
    }

    #[test]
    fn test_get_ciruits() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let dp = distance_pair(&array_with_chords);
        let result: HashSet<Vec<usize>> = get_circuits(&array_with_chords, &dp, 20);
        let mult_by = calcuate_sum(&result);
        assert_eq!(mult_by, 40);
    }
    #[test]
    fn test_get_ciruits_real() {
        let data: Vec<String> = lines_from_file("./real.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let dp = distance_pair(&array_with_chords);
        let result: HashSet<Vec<usize>> = get_circuits(&array_with_chords, &dp, 2000);
        let mult_by = calcuate_sum(&result);
        assert_eq!(mult_by, 40);
    }

    #[test]
    fn test_find_all_closes_pair() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let closed_pair: Vec<Vec<f64>> = get_closes_pair(&array_with_chords);
        assert_eq!(closed_pair.len(), 20);
    }

    #[test]
    fn test_get_index_for_chords() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        assert_eq!(
            get_index_for_chords(
                &array_with_chords,
                &Chords {
                    x: 466.0,
                    y: 668.0,
                    z: 158.0
                }
            ),
            5
        )
    }

    #[test]
    fn test_get_closed_for_each_chords() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let closed_pair: Vec<Vec<f64>> = get_closes_pair(&array_with_chords);
        let for_each = get_pairs(&array_with_chords, &closed_pair);
        assert_eq!(for_each.len(), 20);
    }

    #[test]
    fn calcuate_closes_distance_for_first() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        let index = 0;
        let closes_for_0 = find_closed_object(&array_with_chords, index);
        assert_eq!(closes_for_0, 19);
    }

    #[test]
    fn test_calcuate_euclidian_distance() {
        let first: Chords = Chords {
            x: 162.0,
            y: 817.0,
            z: 812.0,
        };
        let seconds: Chords = Chords {
            x: 425.0,
            y: 690.0,
            z: 689.0,
        };
        assert_eq!(get_euclidean_distance(&first, &seconds), 316.90219311326956)
    }

    #[test]
    fn read_data() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        assert_eq!(
            data,
            [
                "162,817,812",
                "57,618,57",
                "906,360,560",
                "592,479,940",
                "352,342,300",
                "466,668,158",
                "542,29,236",
                "431,825,988",
                "739,650,466",
                "52,470,668",
                "216,146,977",
                "819,987,18",
                "117,168,530",
                "805,96,715",
                "346,949,466",
                "970,615,88",
                "941,993,340",
                "862,61,35",
                "984,92,344",
                "425,690,689"
            ]
        );
    }

    #[test]
    fn test_hash_map_from_data_with_x_y_z_chords() {
        let data: Vec<String> = lines_from_file("./example.txt").unwrap();
        let array_with_chords: Vec<Chords> = get_chords(&data);
        assert_eq!(
            array_with_chords[0],
            Chords {
                x: 162.0,
                y: 817.0,
                z: 812.0
            }
        )
    }

    #[test]
    fn test_second_chords_pair() {
        let first = Chords {
            x: 906.0,
            y: 360.0,
            z: 560.0,
        };
        let seconds = Chords {
            x: 805.0,
            y: 96.0,
            z: 715.0,
        };

        assert_eq!(get_euclidean_distance(&first, &seconds), 322.36935338211043)
    }

    #[test]
    fn test_third_chords_pair() {
        let first = Chords {
            x: 425.0,
            y: 690.0,
            z: 689.0,
        };
        let seconds = Chords {
            x: 431.0,
            y: 825.0,
            z: 988.0,
        };

        assert_eq!(get_euclidean_distance(&first, &seconds), 328.11888089532425)
    }
}

package main

import (
	"fmt"
	"testing"
)

func TestReadFile(t *testing.T) {
	data := getData("./example.txt")
	temp := [][]int{{5, 4}, {4, 2}, {4, 5}, {3, 0}, {2, 1}, {6, 3}, {2, 4}, {1, 5}, {0, 6}, {3, 3}, {2, 6}, {5, 1}, {1, 2}, {5, 5}, {2, 5}, {6, 5}, {1, 4}, {0, 4}, {6, 4}, {1, 1}, {6, 1}, {1, 0}, {0, 5}, {1, 6}, {2, 0}}
	if compareSlice(data, temp) == false {
		t.Errorf("Not equal actual %v, but expect %v", data, temp)
	}
}

func TestReadRealFile(t *testing.T) {
	data := getData("./real.txt")
	if len(data) < 1 {
		t.Errorf("can't read, data is %v", data)
	}
}

func TestReadSortNBytes(t *testing.T) {
	data := getData("./example.txt")
	first_12 := data[:12]
	array := fillCorruptData(first_12)
	if array[0][3] != 1 {
		t.Errorf("wrong data in array %v", array)
	}
}

func TestFindPath(t *testing.T) {
	data := fillCorruptData(getData("./example.txt")[:12])
	answer := findPaths(&data, 6)
	expectd := 22
	if answer != expectd {
		t.Errorf("Wrong answer expect %d, but has %d", expectd, answer)
	}
}

func TestRealPath(t *testing.T) {
	data := fillCorruptData(getData("./real.txt")[:1024])
	answer := findPaths(&data, 70)
	expect := 1
	if answer != expect {
		t.Errorf("Wrong answer expect %d, but has %d", expect, answer)
	}
}

func compareSlice(first [][]int, seconde [][]int) bool {
	if len(first) < 1 && len(seconde) < 1 {
		return false
	}
	if len(first) != len(seconde) {
		return false
	}
	for i := 0; i < len(first); i++ {
		for j := 0; j < len(first[0]); j++ {
			if first[i][j] != seconde[i][j] {
				fmt.Printf("not equal first %d, but second %d", first[i][j], seconde[i][j])
				return false
			}
		}
	}
	return true
}

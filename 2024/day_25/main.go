package main

import (
	"fmt"
	"os"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getData(path string) []LockKey {
	data, err := os.ReadFile(path)
	check(err)
	lines := strings.Split(string(data), "\n\n")
	lk := []LockKey{}
	for _, line := range lines {
		lk = append(lk, getColumns(line))
	}
	return lk
}

type LockKey struct {
	heights []int
	is_key  bool
}

func getColumns(d string) LockKey {
	data := strings.Split(d, "\n")
	heights := [5]int{0, 0, 0, 0, 0}
	is_key := data[0][0] == '.'

	for index, l := range data {
		if index == 0 || index == 6 {
			continue
		}
		if len(l) > 1 {
			for j := 0; j < len(l); j++ {
				if l[j] == '#' {
					heights[j] += 1
				}
			}
		}
	}

	return LockKey{is_key: is_key, heights: heights[:]}
}

type Sep struct {
	lock [][]int
	keys [][]int
}

func calculateLockKey(lk *[]LockKey) Sep {
	result := Sep{}

	for _, val := range *lk {
		if val.is_key {
			result.keys = append(result.keys, val.heights)
		} else {
			result.lock = append(result.lock, val.heights)
		}
	}

	return result
}

func getFit(data *Sep) int {
	result := 0
	for _, keys := range data.keys {
		for _, lock := range data.lock {
			if noOverlap(keys, lock) {
				result += 1
			}
		}
	}

	return result
}

func noOverlap(k []int, l []int) bool {
	fmt.Printf("k %v, l %v \n", k, l)
	for i := 0; i < len(k); i++ {
		if k[i]+l[i] > 5 {
			fmt.Printf("k %v, l %v \n", k[i], l[i])
			return false
		}
	}

	return true
}

package main

import (
	"errors"
	"fmt"
	"os"
	"strings"
)

type Queue struct {
	data []tuple
}

func (q *Queue) Enqueue(elem tuple) {
	q.data = append(q.data, elem)
}

func (q *Queue) Dequeue() tuple {
	if q.IsEmpty() {
		fmt.Println("Underflow")
		return tuple{}
	}
	tup := q.data[0]

	if q.GetLength() == 1 {
		q.data = nil
		return tup
	}
	q.data = q.data[1:]
	return tup
}

func (q *Queue) GetLength() int {
	return len(q.data)
}

func (q *Queue) IsEmpty() bool {
	return len(q.data) == 0
}

func (q *Queue) Peek() (tuple, error) {
	if q.IsEmpty() {
		return tuple{}, errors.New("empty queue")
	}
	return q.data[0], nil
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getData(path string) [][]string {
	data, err := os.ReadFile(path)
	check(err)
	var result [][]string
	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		temp := strings.Split(line, "")
		if len(temp) > 0 {
			result = append(result, temp)
		}
	}
	return result
}

type tuple struct {
	x int
	y int
}

func inArray(pair tuple, array []tuple) bool {
	for _, tup := range array {
		if tup.x == pair.x && tup.y == pair.y {
			return true
		}
	}
	return false
}

func union(from []tuple, to []tuple) []tuple {
	result := []tuple{}
	for _, fr := range from {
		if inArray(fr, to) && !inArray(fr, result) {
			result = append(result, fr)
		}
	}
	for _, t := range to {
		if inArray(t, to) && !inArray(t, result) {
			result = append(result, t)
		}
	}
	return result
}

func findPaths(data [][]string) [][]tuple {
	regions := [][]tuple{}
	seen := []tuple{}

	row := len(data)
	cols := len(data[0])

	for i := 0; i < row; i++ {
		for j := 0; j < cols; j++ {
			if inArray(tuple{i, j}, seen) {
				continue
			}
			seen = append(seen, tuple{i, j})
			region := []tuple{{i, j}}
			q := Queue{}
			q.Enqueue(tuple{i, j})
			crop := data[i][j]
			for !q.IsEmpty() {
				current := q.Dequeue()
				for _, tup := range []tuple{{current.x - 1, current.y}, {current.x + 1, current.y}, {current.x, current.y - 1}, {current.x, current.y + 1}} {
					if tup.x < 0 || tup.y < 0 || tup.x >= row || tup.y >= cols {
						continue
					}
					if data[tup.x][tup.y] != crop {
						continue
					}
					if inArray(tup, region) {
						continue
					}
					region = append(region, tup)
					q.Enqueue(tup)
				}

			}
			region = union(seen, region)
			regions = append(regions, region)
		}
	}

	return regions
}

func getCost(data [][]tuple) int {
	result := 0
	for i := 0; i < len(data); i++ {
		for _, value := range data[i] {
			result += 4
			for _, tup := range []tuple{{value.x - 1, value.y}, {value.x + 1, value.y}, {value.x, value.y - 1}, {value.x, value.y + 1}} {
				if inArray(tup, data[i]) {
					result -= 1
				}
			}
		}
	}
	return result
}

func main() {
}

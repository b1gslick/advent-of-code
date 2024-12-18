package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getData(path string) [][]int {
	data, err := os.ReadFile(path)
	check(err)
	var result [][]int
	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		temp := strings.Split(line, ",")
		if len(temp) > 0 {
			var t []int
			for _, num := range temp {
				n, err := strconv.Atoi(num)
				if err != nil {
					continue
				}
				t = append(t, n)
			}
			if len(t) > 0 {
				result = append(result, t)
			}
		}
	}
	return result
}

func fillCorruptData(data [][]int) [71][71]int {
	result := [71][71]int{}
	for _, data := range data {
		result[data[1]][data[0]] = 1
	}

	return result
}

type QueueData struct {
	x   int
	y   int
	dir int
}

type Queue struct {
	data []QueueData
}

func (q *Queue) Enqueue(elem QueueData) {
	q.data = append(q.data, elem)
}

func (q *Queue) Dequeue() QueueData {
	if q.IsEmpty() {
		fmt.Println("Underflow")
		return QueueData{}
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

func (q *Queue) Peek() (QueueData, error) {
	if q.IsEmpty() {
		return QueueData{}, errors.New("empty queue")
	}
	return q.data[0], nil
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

func findPaths(data *[71][71]int, size int) int {
	seen := []tuple{{0, 0}}

	q := Queue{}
	q.Enqueue(QueueData{0, 0, 0})

	for !q.IsEmpty() {
		current := q.Dequeue()
		for _, tup := range []tuple{{current.x - 1, current.y}, {current.x + 1, current.y}, {current.x, current.y - 1}, {current.x, current.y + 1}} {
			if tup.x < 0 || tup.y < 0 || tup.x > size || tup.y > size {
				continue
			}
			if data[tup.x][tup.y] == 1 {
				continue
			}
			if inArray(tup, seen) {
				continue
			}
			if tup.x == size && tup.y == size {
				return current.dir + 1
			}
			seen = append(seen, tup)
			q.Enqueue(QueueData{tup.x, tup.y, current.dir + 1})
		}

	}
	return 0
}

func main() {}

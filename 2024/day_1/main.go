package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func getData(path string) []string {
	data, err := os.ReadFile(path)
	check(err)
	lines := strings.Split(string(data), "\n")
	return lines
}

func star_1() {
	var left []int
	var right []int
	lines := getData("./input.txt")
	for _, value := range lines {
		split := strings.Split(value, "   ")
		if len(split) > 1 {
			i_1, err := strconv.Atoi(split[0])
			check(err)
			i_2, err := strconv.Atoi(split[1])
			check(err)
			left = append(left, i_1)
			right = append(right, i_2)
		}
	}
	sort.Ints(left)
	sort.Ints(right)

	var result int

	for i := 0; i < len(left); i++ {
		result = result + abs((left[i])-right[i])
	}
	fmt.Printf("%d", result)
}

func star_2() {
	answer := make(map[string]int)
	lines := getData("./input_2.txt")
	var right []string
	for _, value := range lines {
		split := strings.Split(value, "   ")
		if len(split) > 1 {
			answer[split[0]] = 0
			right = append(right, split[1])
		}
	}

	for _, value := range right {
		val, ok := answer[value]
		if ok {
			val = val + 1
			answer[value] = val
		}
	}
	for k, v := range answer {
		if v != 0 {
			fmt.Printf("%s: %d\n", k, v)
		}
	}

	result := 0
	for k, v := range answer {
		i_1, err := strconv.Atoi(k)
		check(err)
		result = result + (i_1 * v)
	}
	fmt.Printf("%d", result)
}

func main() {
	star_2()
}

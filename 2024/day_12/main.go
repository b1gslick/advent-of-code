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

func calculateResult(data [][]string) map[string][]int {
	var result map[string][]int

	row := len(data)
	cols := len(data[0])

	for i := 0; i < row; i++ {
		line := data[i]

		for j, area := range line {
			sides = 4

			value, ok := result[area]
			if ok {
			}
		}
	}

	return result
}

func main() {
	lines := getData("./example.txt")

	for _, line := range lines {
		fmt.Printf("%s", line)
	}
}

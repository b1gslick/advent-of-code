package main

import (
	"os"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getData(path string) []string {
	data, err := os.ReadFile(path)
	check(err)
	lines := strings.Split(string(data), "\n")
	return lines
}

func pressDircetly(code string) string {
	return ""
}

func main() {
}

package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"unicode"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type number struct {
	name  string
	digit int
}

func match(s string) int {
	var all_numbers []number
	all_numbers = append(all_numbers, number{"one", 1})
	all_numbers = append(all_numbers, number{"two", 2})
	all_numbers = append(all_numbers, number{"three", 3})
	all_numbers = append(all_numbers, number{"four", 4})
	all_numbers = append(all_numbers, number{"five", 5})
	all_numbers = append(all_numbers, number{"six", 6})
	all_numbers = append(all_numbers, number{"seven", 7})
	all_numbers = append(all_numbers, number{"eight", 8})
	all_numbers = append(all_numbers, number{"nine", 9})

	result := had_digit(s)
	if result != -1 {
		return result
	}
	for _, number := range all_numbers {
		if strings.Contains(s, number.name) {
			return number.digit
		}
	}
	return -1
}

func main() {

	// f, err := os.Open("cmd/first/question.txt")
	f, err := os.Open("cmd/first/question.txt")
	check(err)

	defer f.Close()

	scanner := bufio.NewScanner(f)
	sum := 0

	for scanner.Scan() {
		line := scanner.Text()
		fmt.Println(line)
		total := compare(line)

		fmt.Println(total)
		sum += total
	}
	fmt.Println(sum)
}

func compare(line string) int {

	leftmost := -1
	rightmost := -1
	mathchnum := 0
	for index, ch := range line {

		if unicode.IsDigit(ch) {
			if leftmost == -1 {
				leftmost = int(ch - '0')
				rightmost = int(ch - '0')
			} else {
				rightmost = int(ch - '0')
			}
		} else if leftmost == -1 {
			mathchnum = match(line[:index+1])
			if mathchnum != -1 {
				leftmost = mathchnum
			}
		} else {
			mathchnum = match(line[len(line)-index+1:])
			if mathchnum != -1 {
				rightmost = mathchnum
				break
			}
		}

	}

	total := leftmost*10 + rightmost
	return total
}

func had_digit(line string) int {
	for _, ch := range line {
		if unicode.IsDigit(ch) {
			return int(ch - '0')
		}
	}
	return -1
}

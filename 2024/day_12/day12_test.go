package main

import (
	"testing"
)

func Test_day12_read_data(t *testing.T) {
	t.Run("read data", func(t *testing.T) {
		got := getData("example.txt")
		want := [][]string{{"A", "A", "A", "A"}, {"B", "B", "C", "D"}, {"B", "B", "C", "C"}, {"E", "E", "E", "C"}}
		if len(got) != len(want) {
			t.Errorf("data not equals")
		}
	})

	t.Run("we got struct with area and perimeters", func(t *testing.T) {
		data := getData("example.txt")
		got := calculateResult(data)
		want := []int{4, 4, 10}
		for index, number := range want {
			result := got["A"]
			if result[index] != number {
				t.Errorf("For A we expected %d, but got %d", want[index], number)
			}
		}
	})
}

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
	t.Run("Calculate cost of fence for example 1 should be 140", func(t *testing.T) {
		got := getCost(findPaths(getData("example.txt")))
		want := 140

		if want != got {
			t.Errorf("result are not equals got %d, but want %d", got, want)
		}
	})

	t.Run("Calculate cost of fence for example 2 should be 772", func(t *testing.T) {
		got := getCost(findPaths(getData("example2.txt")))
		want := 772

		if want != got {
			t.Errorf("result are not equals got %d, but want %d", got, want)
		}
	})

	t.Run("Calculate cost of fence for example 3 should be 1930", func(t *testing.T) {
		got := getCost(findPaths(getData("example3.txt")))
		want := 1930

		if want != got {
			t.Errorf("result are not equals got %d, but want %d", got, want)
		}
	})

	t.Run("Calculate cost of fence for real input", func(t *testing.T) {
		got := getCost(findPaths(getData("real.txt")))
		want := 1402544

		if want != got {
			t.Errorf("result are not equals got %d, but want %d", got, want)
		}
	})
}

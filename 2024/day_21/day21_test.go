package main

import (
	"testing"
)

func TestReadFile(t *testing.T) {
	data := getData("./example.txt")
	if len(data) == 0 {
		t.Errorf("Data is empty %v", data)
	}
}

func TestPressDirectrly(t *testing.T) {
	data := getData("./example.txt")
	result := pressDircetly(data[0])
	expect := "<A^A>^^AvvvA"
	if result != expect {
		t.Errorf("Expect %s, but got %s", expect, result)
	}
}

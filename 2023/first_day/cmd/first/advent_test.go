package main

import (
	"testing"
)

func TestWordWithDigit(t *testing.T) {
	var lines = map[string]int{
		"fivefour7nineseven1qtcdqbp1four":  54,
		"fourkdnsvcq9sevendmhsdgt54threej": 43,
		"fourzvkqhdninetwoftscrmsd64nxsgx": 44,
		"two9jsix5gcxf":                    25,
		"zrjts8sixsix237flm":               87,
	}

	for string, number := range lines {
		total := compare(string)
		if total != number {
			t.Errorf("Result is incorect, got: %d, want: %d", total, number)
		}
	}

}

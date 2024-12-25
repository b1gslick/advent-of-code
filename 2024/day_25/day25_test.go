package main

import (
	"testing"
)

func TestGetLockAndKeys(t *testing.T) {
	data := getData("./example.txt")
	if len(data) < 1 {
		t.Errorf("expect: but got %v", data)
	}
}

func TestSeparateLockKeys(t *testing.T) {
	data := getData("./example.txt")
	sepData := calculateLockKey(&data)
	if len(sepData.keys) != 3 {
		t.Errorf("expect: 3 keys but got %d", len(sepData.keys))
	}
	if len(sepData.lock) != 2 {
		t.Errorf("expect: 2 keys but got %d", len(sepData.lock))
	}
}

func TestMatchKeysAndLock(t *testing.T) {
	data := getData("./example.txt")
	sepData := calculateLockKey(&data)
	result := getFit(&sepData)
	if result != 3 {
		t.Errorf("expect fit for 3 but got %d", result)
	}
}

func TestMatchReal(t *testing.T) {
	data := getData("./real.txt")
	sepData := calculateLockKey(&data)
	result := getFit(&sepData)
	if result != 3 {
		t.Errorf("expect fit for 3 but got %d", result)
	}
}

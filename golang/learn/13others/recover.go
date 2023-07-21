package main

import (
	"fmt"
)

func foo() {
	panic("my exception")
}

func recover_test() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("caught exception: %s", r)
		}
	}()

	foo()
}

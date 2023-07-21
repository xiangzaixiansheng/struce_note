package main

import (
	"fmt"
	"time"
)

func callback2(i int) {
	fmt.Println("called", i)
}

func test() {
	ticker := time.NewTicker(1 * time.Second)

	i := 0
	for range ticker.C {
		callback2(i)

		if i == 3 {
			ticker.Stop()
			break
		}

		i++
	}
}

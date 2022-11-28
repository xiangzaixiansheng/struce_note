package test

import (
	"fmt"
	"time"
)

func test2() {
	//timer 和 channel
	timer := time.NewTimer(5 * time.Second)
	fmt.Printf("time is %v", time.Now().Unix())
	expireTime := <-timer.C
	fmt.Printf("expireTime is %v \n", expireTime)

	fmt.Printf("expireTime is %v", timer.Stop())

	timer2 := <-time.After(5 * time.Second)
	fmt.Printf("timer2 is %v \n", timer2)

	//简单的定时器
	intChan := make(chan int, 1)
	go func() {
		time.Sleep(1 * time.Second)
		intChan <- 1
	}()

	select {
	case <-intChan:
		fmt.Printf("1s Done")
	case <-time.NewTimer(3 * time.Second).C:
		fmt.Println("time out")
	}

	//每间隔5s发送一个随机数
	intChan2 := make(chan int, 1)
	timeTicker := time.NewTicker(5 * time.Second)
	go func() {
		for _ = range timeTicker.C {
			select {
			case intChan2 <- 1:
			case intChan2 <- 2:
			case intChan2 <- 3:
			}
		}
	}()

	var sum int
	//遍历这个channel
	for e := range intChan2 {
		fmt.Println("reveice ", e)
		sum += e
		if sum > 10 {
			fmt.Println("超过10 任务结束")
			//结束定时timer
			timeTicker.Stop()
			break
		}
	}

}

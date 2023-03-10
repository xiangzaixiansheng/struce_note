package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"
)

func main() {
	fmt.Println("单引号a 实际为a的ascII值", 'a')
	//简单定时器
	intChan := make(chan int, 1)
	go func() {
		time.Sleep(2 * time.Second)
		intChan <- 1
	}()
	select {
	case <-intChan:
		fmt.Println("定时器到=")
	case <-time.NewTimer(3 * time.Second).C:
		fmt.Println("超时了=")
	}

	//处理decode
	var data = []byte(`{"status": 200}`)
	var result map[string]interface{}
	if err := json.Unmarshal(data, &result); err != nil {
		fmt.Println(err)
	}
	fmt.Printf("result %v", result)
	var status = uint64(result["status"].(float64))
	fmt.Println(result["status"])
	fmt.Println("Status value: ", status)

	timeTicker := time.NewTicker(5 * time.Second)

	for {
		select {
		case <-timeTicker.C:
			fmt.Println("准备结束")
			goto EXIT2
		}
	}
EXIT2:
	fmt.Println("结束啦===")

	ch1 := make(chan int)
	done := make(chan bool) // 通道
	go func() {
		fmt.Println("子goroutine执行。。。")
		time.Sleep(3 * time.Second)
		data := <-ch1 // 从通道中读取数据
		fmt.Println("data：", data)
		done <- true
	}()

	time.Sleep(5 * time.Second)
	ch1 <- 100
	fmt.Println("等待执行完成***")

	<-done

	fmt.Println("done 函数执行结束")

	ch3 := make(chan string, 4)
	go sendData3(ch3)
	for {
		time.Sleep(1 * time.Second)
		v, ok := <-ch3
		if !ok {
			fmt.Println("读完了，，", ok)
			break
		}
		fmt.Println("\t读取的数据是：", v)
	}

	fmt.Println("main...over...")

}

func sendData3(ch3 chan string) {
	for i := 0; i < 10; i++ {
		ch3 <- "数据" + strconv.Itoa(i)
		fmt.Println("子goroutine，写出第", i, "个数据")
	}
	close(ch3)
}

package main

import "fmt"

func test() {
	dataChan := make(chan int, 5)
	syncChan1 := make(chan struct{}, 1)
	syncChan2 := make(chan struct{}, 2)

	go func() {
		<-syncChan1
		for {
			if item, ok := <-dataChan; ok {
				fmt.Println("收到信息", item)
			} else {
				break
			}

		}
		syncChan2 <- struct{}{}
	}()

	go func() {
		for i := 0; i < 5; i++ {
			dataChan <- i
		}
		//虽然通道已经关闭，但是不影响后面的数据接受
		close(dataChan)
		syncChan1 <- struct{}{}
		fmt.Println("send Done")

		syncChan2 <- struct{}{}
	}()
	<-syncChan2
	<-syncChan2
	fmt.Println("任务结束")

}

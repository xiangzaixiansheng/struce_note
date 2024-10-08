## Go的并发控制

在Go实际开发中，并发安全是老生常谈的事情，在并发下，`goroutine`之间的存在数据资源等方面的竞争。

为了**保证数据一致性、防止死锁等**问题的出现，在并发中需要使用一些方式来实现并发控制。

并发控制的目的是**确保在多个并发执行的线程或进程中，对共享资源的访问和操作能够正确、有效地进行，并且避免出现竞态条件和数据不一致的问题**。

在Go中，可以通过以下几种方式来实现并发控制：

### 1、channel

`channel`通道主要用于于`goroutine`之间通信和同步的机制。通过使用`channel`，可以在不同的`goroutine`之间进行数据的发送与接收，从而实现协调和控制并发，以达到并发控制。

根据`channel`的类型，可以实现不同的并发控制效果：

#### 无缓冲channel

当使用`make`初始化时，不指定`channel`的容量大小，即初始化无缓冲`channel`；

当发送方向无缓冲`channel`发送消息数据时，如果发送后`channel`的数据未被接收方获取，则当前`goroutine`会阻塞在发送语句中，直到有接收者准备好接收数据为止，即无缓冲通道要求发送操作和接收操作同时准备好才能完成通信。这样做是确保了发送和接收的同步，避免了数据竞争和不确定性。

```go
go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 创建一个无缓冲通道
    ch := make(chan int)

    // 启动一个 goroutine 接收数据
    go func() {
       time.Sleep(time.Second * 5)
       fmt.Println("等待接收数据")
       data := <-ch // 接收数据
       fmt.Println("接收到数据:", data)
    }()

    fmt.Println("发送数据")
    // 发送数据，由于匿名函数goroutine睡眠，无缓冲通道内数据没有goroutine接收，因此会阻塞。5s后被接收则继续执行
    ch <- 100 
    time.Sleep(time.Second)
    fmt.Println("程序结束")
}
```

- 在上述代码中，创建了一个无缓冲通道 `ch`。然后在一个单独的 `goroutine` 中启动了一个接收操作，等待从通道 `ch` 中接收数据。
- 接下来，在`main goroutine`中执行发送操作，向通道 `ch` 发送数据 `100`。
- 由于无缓冲通道的特性，当发送语句 `ch <- 100` 执行时，由于没有接收者准备好接收数据（单独的`goroutine`处于`5s`睡眠），发送操作会被阻塞。
- 接收方的 `goroutine` 在接收数据之前会一直等待。
- 当接收方的 `goroutine` 准备好之后，发送操作完成，数据被成功发送并被接收方接收，然后程序继续执行后续语句，打印出相应的输出。

需要注意的是，**在使用无缓冲`channel`时，如果没有接收者，发送操作将会永久阻塞，可能会导致死锁**，因此在使用无缓冲通道时，需要确保发送和接收操作能够匹配。

#### 有缓冲channel

当使用`make`初始化时，可以指定`channel`的容量大小，即初始化有缓冲`channel`，**通道的容量表示通道中最大能存放的元素数量**。

- 当发送方发送数据到有缓存`channel`时，如果缓冲区满了，则发送方会被阻塞直到有缓冲空间可以接收这个消息数据；
- 当接收方在有缓冲`channel`接收数据时，如果缓冲区为空，则接收方会被阻塞直到`channel`有数据可读；

无论是缓存 `channel` 还是无缓冲 `channel`，都是并发安全的，即多个` goroutine` 可以同时发送和接收数据，而不需要额外的同步机制。

但是，由于缓存 `channel` 具有缓存空间，因此在使用时需要特别注意缓存空间的大小，避免过度消耗内存或者发生死锁等问题。

### 2、sync.WaitGroup

在`sync`包中，`sync.WaitGroup`可以在并发`goroutine`之间起到执行屏障的效果。`WaitGroup`提供了用于创建多个goroutine时，能够等待多个并发执行的代码块在达到`WaitGroup`显示指定的同步条件后，才可以继续执行`Wait`的后续代码。在使用`sync.WaitGroup`实现同步模式下，从而起到并发控制的效果。

在Go中，`sync.WaitGroup`类型提供了如下几个方法：

| 方法名                                 | 功能说明                  |
| -------------------------------------- | ------------------------- |
| `func (wg * WaitGroup) Add(delta int)` | 等待组计数器 + delta      |
| `(wg *WaitGroup) Done()`               | 等待组计数器-1            |
| `(wg *WaitGroup) Wait()`               | 阻塞直到等待组计数器变为0 |

示例：

```go
go
epackage main

import (
    "fmt"
    "sync"
)

// 声明全局等待组变量
var wg sync.WaitGroup

func printHello() {
    fmt.Println("Hello World")
    wg.Done() // 完成一个任务后，调用Done()方法，等待组减1，告知当前goroutine已经完成任务
}

func main() {
    wg.Add(1) // 等待组加1，表示登记一个goroutine
    go printHello()
    fmt.Println("main")
    wg.Wait() // 阻塞当前goroutine，直到等待组中的所有goroutine都完成任务
}

// 执行结果
main
Hello World
```

### 3、sync.Mutex

`sync.Mutex` 是 Go 语言中的一个互斥锁（`Mutex`）类型，用于实现对共享资源的互斥访问。

互斥锁是一种常见的并发控制机制，它能够确保在同一时刻只有一个 `goroutine` 可以访问被保护的资源，从而避免数据竞争和不确定的结果。

互斥锁的作用可以有以下几个方面：

- 保护共享资源：当多个 `goroutine`并发访问共享资源时，通过使用互斥锁可以限制只有一个 `goroutine` 可以访问共享资源，从而避免竞态条件和数据不一致的问题。
- 实现临界区：互斥锁可以将一段代码标记为临界区，只有获取了锁的 `goroutine` 才能执行该临界区的代码，其他 `goroutine` 则需要等待解锁，才能够访问临界区内的代码块。

互斥锁的基本使用方式是，通过调用 `Lock()` 方法获取锁，执行临界区代码，然后调用 `Unlock()` 方法释放锁。在获取锁之后，其他 `goroutine` 将会被阻塞，直到当前 `goroutine` 释放锁为止。`Lock()` 方法与`Unlock()` 底层的实现原理是使用原子操作来维护`Mutex`的`state`状态。

`sync.Mutex`中，除了最基本的互斥锁外，还提供读写锁，在读多写少的场景下，相比互斥锁性能上能够有所提升。

> `channel` 与 `Mutex` 对比例子

在自增操作`x++`中，该操作并非原子操作，因此在多个`goroutine`对全局变量`x`进行自增时，会出现数据覆盖的情况，因此可以通过一些方法来实现并发控制，例如`channel`、`互斥锁`、`原子操作`。

可以对比一下`channel`与`互斥锁`在实现并发控制时的执行时间：

- 使用`channel`

```go
go
package main

import (
    "fmt"
    "sync"
    "time"
)

var x int64
var wg sync.WaitGroup

func main() {
    startTime := time.Now()
    ch := make(chan struct{}, 1)

    for i := 0; i < 10000; i++ {
       wg.Add(1)
       go func() {
          defer wg.Done()
          ch <- struct{}{}
          x++
          <-ch
       }()
    }
    wg.Wait()
    endTime := time.Now()
    fmt.Println(x)                      // 10000
    fmt.Println(endTime.Sub(startTime)) // 6.2933ms
}
```

- 使用`Mutex`

```go
go
package main

import (
    "fmt"
    "sync"
    "time"
)

var x int64
var wg sync.WaitGroup
var lock sync.Mutex

func main() {
    startTime := time.Now()
    for i := 0; i < 10000; i++ {
       wg.Add(1)
       go func() {
          defer wg.Done()
          lock.Lock()
          x++
          lock.Unlock()
       }()
    }
    wg.Wait()
    endTime := time.Now()
    fmt.Println(x)                      // 10000
    fmt.Println(endTime.Sub(startTime)) // 3.0835ms
}
```

可以对比两种方法的执行时间，在启动`10000`个`goroutine`执行`10000`次全局变量`x++`时，`channel`实现并发控制全局变量`x++`的执行时间为`6.2933ms`（存在波动），而使用`Mutex`提供的互斥锁实现并发控制全局变量`x++`的执行时间为`3.0835ms`（存在波动），大约在两倍左右，这是为什么呢？

原因在于`channel`的操作涉及到**`goroutine`之间的调度和上下文的切换**，而互斥锁底层使用了Go的原子操作，执行时间较短，因为互斥锁的操作相对轻量，不涉及`goroutine`的调度以及上下文的切换。

在开发过程中，选择使用通道还是互斥锁取决于具体的场景与需求，并不是一定说使用锁就好，需要根据实际的业务场景来进行选择。如果需要更细粒度的控制和更高的并发性能，可以优先考虑使用互斥锁。

### 4、atomic原子操作

Go语言提供了原子操作用于对内存中的变量进行同步访问，避免了多个`goroutine`同时访问同一个变量时可能产生的竞态条件。

`sync/atomic`包提供了原子加操作、比较并交换等方法提供一系列原子操作，这些方法利用底层的原子指令，确保对内存中的变量进行原子级别的访问和修改，从而实现并发控制。

```go
go
package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

var x int64
var wg sync.WaitGroup

// 使用原子操作
func atomicAdd() {
    atomic.AddInt64(&x, 1)
    wg.Done()
}

func main() {
    for i := 0; i < 10000; i++ {
       wg.Add(1)
       go atomicAdd() // 原子操作add函数
    }
    wg.Wait()
    fmt.Println(x) // 10000
}
```

一些常用的原子操作函数：

- `Add`函数：`AddInt32`、`AddInt64`、`AddUint32`、`AddUint64`等方法，用于对变量进行**原子加操作**。
- `CompareAndSwap`函数：`CompareAndSwapInt32`、`CompareAndSwapInt64`、`CompareAndSwapUint32`、`CompareAndSwapUint64`等，用于比较并交换操作，当旧值等于给定值时，将新值赋值到指定地址中。
- `Load`函数：`LoadInt32`、`LoadInt64`、`LoadUint32`、`LoadUint64`等，用于加载操作，返回指定地址中存储的值。
- `Store`函数：`StoreInt32`、`StoreInt64`、`StoreUint32`、`StoreUint64`等，用于存储操作，将给定的值存储到指定地址中。
- `Swap`函数：`SwapInt32`、`SwapInt64`、`SwapUint32`、`SwapUint64`等，用于交换操作，将指定地址中存储的值和给定的值进行交换，并返回原值。
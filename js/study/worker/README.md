## 一、child_process

child_process 模块提供了以下 4 个方法用于创建子进程，**并且每一种方法都有对应的同步版本**：

- spawn: 启动一个子进程来执行命令；
- exec:  启动一个子进程来执行命令，与 spawn 不同的是，它有一个回调函数获知子进程的状况；
- execFile: 启动一个子进程来执行可执行文件；
- fork: 与 spawn 类似，不同点在于它创建 Node 的子进程只需指定要执行的 JavaScript 文件模块即可

差异列表如下：

| 类型     | 回调/异常 | 进程类型 | 执行类型        | 可设置超时 |
| -------- | --------- | -------- | --------------- | ---------- |
| spawn    | 不支持    | 任意     | 命令            | 不支持     |
| exec     | 支持      | 任意     | 命令            | 支持       |
| execFile | 支持      | 任意     | 可执行文件      | 支持       |
| fork     | 不支持    | Node     | JavaScript 文件 | 不支持     |





## 二、cluster

```
cluster对child_process的进一步补充，实现多进程
```

- 专用于解决单进程`NodeJS Web`服务器无法充分利用多核`CPU`的问题。
- 用于简化多进程服务程序的开发。



## 三、process

#### process.nextTick()

- 在同步事件执行完成之后，就会触发，是在本轮循环执行的
- 将大事件拆分为小事件，减少每个事件的执行时间，提高事件响应速度
- 引入的原因：Node是单线程，如果某个事件占用大量的CPU时间，就会造成页面卡顿，所以用nextTick()缩短每个事件的执行时间
- 不要用setTimeout()代替nextTick，因为setTimeout的效率要低很多

- process.argv可以获得命令行参数
  - `argv[0] == NodeJS`执行程序的绝对路径
  - `argv[1]`： 主模块的绝对路径
  - `argv[2]`：第一个命令行参数从这个位置开始

```JS
  // 获取process命令行命令
  process.argv.slice(2)
```

- process.stdin：标准输入数据流，只读
- Process.stdout：只写
- processs.stderr：只写
- process.channel：如果该进程是由IPC通道创建的，则该属性保存IPC通道的引用，
- process.title：进程名称
- pid：进程ID、ppid：父进程ID
- platform：操作系统平台
- process.updatetime()：当前进程已运行时间
- 如何降权？？？gid \ uid属性
  - 有root权限，才能监听1024以下的端口；完成监听的操作后，最好把权限降下来
    - process.setuid：设置用户标识
    - process.setgid：为进程设置组标识
  - 获取当前uid，或gid
    - process.env.SUDO_UID || SUDO_GID
    - process.getuid() | process.getgid()


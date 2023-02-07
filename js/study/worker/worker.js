// worker.js

process.on('message', (msg, socket) => {
    if (msg !== 'socket') return

    if (Math.random() > 0.6) {
        console.log(`${process.pid} 进程退出了`);
        socket.end(`Error: ${process.pid}`)
        process.exit(1)
    }
    socket.end(`handle by worker: ${process.pid}`)
})
// http是nodejs内置模块
const http = require('http')

const server = http.createServer((req, res) => {
    res.write(`hello http! ${process.pid}`)
    res.end()
})

server.listen(3000, () => {
    console.log('server is listening on http://localhost:3000')
})

// process是node的进程模块，可以从这个模块获取进程的信息，以及控制进程的
console.log(`worker ${process.pid} start`)
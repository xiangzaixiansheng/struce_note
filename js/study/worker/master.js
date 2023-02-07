// master.js

const childProcess = require('child_process')
const net = require('net')
const cpus = require('os').cpus().length

function createExitFn(workers, i) {
    return () => {
        workers[i] = childProcess.fork('./worker.js')
        console.log(`进程重启完成,process id: ${workers[i].pid}`);
        workers[i].on('exit', createExitFn(workers, i))
    }
}

const workers = []
for (let i = 0; i < cpus; i++) {
    const worker = childProcess.fork('./worker.js')
    workers.push(worker)
    worker.on('exit', createExitFn(workers, i)) //进程守护
}

const tcpServer = net.createServer();

let workerId = 0
tcpServer.on('connection', socket => {
    let work_num = workerId % 10;
    if (work_num >= cpus) return;
    workers[workerId % 10].send('socket', socket)
    workerId++
})

tcpServer.listen(8089, (err => {
    console.log('master and workers is ok!');
}))
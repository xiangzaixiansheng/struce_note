const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) { //cluster.isPrimary 新增于: v16.0.0

    // 跟踪 http 请求。
    let numReqs = 0;
    setInterval(() => {
        console.log(`请求的数量 = ${numReqs}`);
    }, 1000);

    // 对请求计数。
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd === 'notifyRequest') {
            console.info(`收到子进程的请求`)
            cluster.workers[2].send('hello world!');
            numReqs += 1;
        }
    }

    // 启动 worker 并监听包含 notifyRequest 的消息。
    const numCPUs = require('os').cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
    }
    // 监听子进程退出事件后重启
    cluster.on('exit', (worker, code, signal) => {
        console.log('[Master] worker ' + worker.process.pid + ' died with code:' + code + ', and' + signal);
        cluster.fork(); // 重启子进程
    });

} else {

    // 当进程出现会崩溃的错误
    process.on('uncaughtException', function(err) {
        // 这里可以做写日志的操作
        console.log(err);
        // 退出进程
        process.exit(1);
    });

    // 内存使用过多，自杀
    if (process.memoryUsage().rss > 734003200) {
        process.exit(1);
    }

    // 接收主进程send方法发送的消息
    process.on('message', function(msg) {
        console.info('pid:' + process.pid + msg);
    });

    // 工作进程有一个 http 服务器。
    http.Server((req, res) => {
        res.writeHead(200);
        res.end('你好世界\n');

        // 通知主进程接收到了请求。
        process.send({ cmd: 'notifyRequest' });
    }).listen(8000);
}
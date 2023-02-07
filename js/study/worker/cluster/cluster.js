const cluster = require('cluster');
// 开启的子进程数
const workerNum = 3;
// 如果是主进程
if (cluster.isMaster) {
    // 创建子进程
    for (let i = 0; i < workerNum; i++) {
        // 通过cluster.fork创建子进程
        cluster.fork()
    }

    // 监听子进程退出事件后重启
    cluster.on('exit', (worker, code, signal) => {
        console.log('[Master] worker ' + worker.process.pid + ' died with code:' + code + ', and' + signal);
        cluster.fork(); // 重启子进程
    });

    // 如果有子进程，就启动相关服务,这里会使用三个进程来执行http服务演示
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

    require('./http_server')
}
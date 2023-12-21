const { Worker } = require('worker_threads');

function runTask (taskData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: taskData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

// 假设这是接收到的任务数据
const taskData = { "test": "测试数据" };

runTask(taskData)
  .then(result => console.log('任务结果:', result))
  .catch(err => console.error(err));

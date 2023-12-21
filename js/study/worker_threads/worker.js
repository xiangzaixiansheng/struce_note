const { workerData, parentPort } = require('worker_threads');

function doWork (taskData) {
  // 执行任务...
  console.info("收到任务信息", taskData);
  return '任务完成结果';
}

const result = doWork(workerData);
parentPort.postMessage(result);

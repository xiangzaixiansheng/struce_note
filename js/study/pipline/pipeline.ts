  import * as path from 'path';
  import * as fs from 'fs';
  import { createGzip } from 'zlib';
  import { Transform } from 'stream';

  // 改写之前的写入写入准备文件代码，得到一个1KB大小的文件
  const smallFile = path.join(__dirname, './test.txt');
  const upperFile = path.join(__dirname, './test.zip');

  const readableStream = fs.createReadStream(smallFile, { encoding: 'utf-8', highWaterMark: 1 * 256 });
  const writeableStream = fs.createWriteStream(upperFile, { encoding: 'utf-8', highWaterMark: 1 * 10 }); // 修改小是为了触发drain

  const upperCaseTr = new Transform({
      transform(chunk, encoding, callback) {
          console.log('chunk', chunk);
          this.push(chunk.toString().toUpperCase());
          // 故障
          callback(new Error('error'));
      },
  });

  // 组合管道链
  readableStream.pipe(createGzip()).pipe(upperCaseTr).pipe(writeableStream);

  upperCaseTr.on('error', (err) => {
      console.log('upperCaseTr error', err);
      // 如果中间段出错，应该关闭管道链其他流
      writeableStream.destroy();
      readableStream.destroy();
  });

  // end
  readableStream.on('end', function() {
      console.log('可读流end');
  });

  // close
  readableStream.on('close', function() {
      console.error('可读流close');
  });

  readableStream.on('data', (chunk) => {
      console.log('压缩前--->', Buffer.byteLength(chunk));
  });

  writeableStream.on('drain', function() {
      console.log('可写流drain');
  });

  writeableStream.on('close', function() {
      console.log('可写流close');
  });

  writeableStream.on('finish', function() {
      console.log('可写流finish');
  });

  writeableStream.on('error', function(err) {
      console.error('可写流error', err);
  });
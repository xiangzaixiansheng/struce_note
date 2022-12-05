const { promisify } = require('util');
const { pipeline } = require('stream');
const { createGzip } = require('zlib');
const pipe = promisify(pipeline);
const path = require('path');
const {
    createReadStream,
    createWriteStream
} = require('fs');


async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
}

// 改写之前的写入写入准备文件代码，得到一个1KB大小的文件
const smallFile = path.join(__dirname, './test.txt');
const upperFile = path.join(__dirname, './test.txt.gz');

do_gzip(smallFile, upperFile).catch((err) => {
    console.error('An error occurred:', err);
    process.exitCode = 1;
});
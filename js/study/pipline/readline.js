var fs = require('fs'),
    readline = require('readline')

const path = require('path');
var os = require('os');



let instream = fs.createReadStream(path.join(__dirname, './readline.csv'));
let outstream = fs.createWriteStream(path.join(__dirname, './random_line.txt'));

let count = 0;

var rl = readline.createInterface({
    input: instream,
    // 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用  
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
    console.log(count, line);
    if (count++ < 100) {
        rl.write(line);
        outstream.write(line + os.EOL); //换行
    } else {
        //关闭 注意不是马上关闭哦
        rl.close();
        instream.destroy();
    }
});
rl.on('close', () => {
    console.info(`readline已经关闭`, count);
})

instream.on('close', () => {
    console.info(`输入流已经关闭`, count);
})
// client.js
const net = require('net');
const cpus = require('os').cpus().length * 2

for (let i = 0; i < cpus; ++i) {
    net.createConnection({
        port: 8089,
        host: '127.0.0.1'
    }).on('data', (d) => {
        console.log(`client====>`, d.toString());
    })
}
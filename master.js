const { Worker } = require('worker_threads');
const net = require('net');

const THREAD_COUNT = 20;

const workers = new Array(THREAD_COUNT);
for (let i = 0; i < THREAD_COUNT; i++) {
    workers[i] = new Worker("./worker.js", { env : { index : i } }); 
}

let index = 0;
const server = net.createServer((req) => {
    index = index == THREAD_COUNT - 1 ? 0 : index + 1;
    workers[index].postMessage({ duplex_fd : req._handle.fd });
});

server.listen(12345);


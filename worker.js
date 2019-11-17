const { Socket } = require('net');

require('worker_threads').parentPort.on('message', (msg) => {
    console.log(`Thread #${process.env.index} handling a request using duplex ${msg.duplex_fd}`);
    const sock = new Socket({ fd : msg.duplex_fd, readable : true, writable : true, allowHalfOpen : true });  

    sock.end("Hello, World", () => {
        // sock.destroy();
    });
})

console.log(`Thread #${process.env.index} ready`);

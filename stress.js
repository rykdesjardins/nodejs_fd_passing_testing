// stress.js
const net = require('net');
const cluster = require('cluster');

if (cluster.isMaster) {
    let reqSent = 0;
    for (let i = 0; i < 10; i++) cluster.fork().on('message', m => m == "+" && console.log(reqSent++));
} else {
    const sendReq = () => {
        const sock = net.connect(12345, 'localhost', () => {
            sock.write("Hello?", () => {
                sock.end();
                sock.destroy();
                process.send("+");
                setImmediate(() => sendReq());
            });
        });
    };
    sendReq();
}

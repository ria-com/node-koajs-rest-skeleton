module.exports = function (io) {
    console.log('Start');
    io.on('connection', async function (socket) {
        console.log('SocketIO connected');
        // socket.on('chat message', function (msg) {
        //     console.log(`chat message: ${msg}`);
        //     socket.emit('chat message', msg);
        // });
    })
}
module.exports = {
    app: {
        name: 'myKoajsRestApp',
        version: '3.1.0'
    },
    server: {
        port: process.env.NODE_APP_INSTANCE || 8081
    },
    worker: process.env.NODE_WORKER_NAME,
    rabbitMq: {
        host: "127.0.0.1",
        port: 5672,
        options: {durable: true},
        queue: process.env.NODE_QUEUE_NAME,
        user: "myuser",
        password: "mypass"
    }
};
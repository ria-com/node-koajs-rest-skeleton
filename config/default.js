module.exports = {
    app: {
        name: 'myKoajsRestApp',
        version: '0.2.0'
    },
    server: {
        port: 8081
    },
    rabbitMq: {
        host: "127.0.0.1",
        port: 5672,
        queue: process.env.NODE_QUEUE_NAME,
        user: "myuser",
        password: "mypass"
    }
};
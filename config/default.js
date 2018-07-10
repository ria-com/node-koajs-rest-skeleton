let package = require('../package');
module.exports = {
    app: {
        name: package.name,
        version: package.version
    },
    server: {
        port: process.env.NODE_APP_INSTANCE || 8081,
        lifeTime: process.env.NODE_LIFE_TIME || '', // For auto rebooting features use 'ms','m','s','h','d' suffix for this variable, for example 12h
    },
    worker: process.env.NODE_WORKER_NAME,
    rabbitMq: {
        host: "127.0.0.1",
        port: 5672,
        options: {durable: true},
        queue: process.env.NODE_QUEUE_NAME,
        user: "myuser",
        password: "mypass"
    },
    similar: {
        items: {
            '1': {
                name: 'autos',
            },
            '2': {
                name: 'newautos',
                master: 1,
                slaveName: "autonewautos_slave"
            },
            '3': {
                name: 'news',
                master: 1,
                slaveName: "autonews_slave"
            },
            '4': {
                name: 'newautoequips',
                master: 1,
                slaveName: "autonewautoequips_slave"
            }

        },
        url: 'http://searchhistory3.elasticsearch.ria.com'
    }
};
const amqp = require("amqplib"),
      config = require("config");

module.exports = function (handler,rabbitMq = {}) {
        rabbitMq = Object.assign(config.rabbitMq, rabbitMq);
        let rabbitMqUrl = ["amqp://", rabbitMq.user, ":", rabbitMq.password, "@", rabbitMq.host, ":", config.rabbitMq.port].join("");
        amqp.connect(rabbitMqUrl)
            .then(function (connection) {
                process.once('SIGINT', function () {
                    connection.close();
                });
                return connection.createChannel()
                    .then(function (channel) {
                        var ok = channel.assertQueue(rabbitMq.queue,rabbitMq.options || {durable: true});
                        ok = ok.then(function () {
                            channel.prefetch(1);
                        });
                        ok = ok.then(function () {
                            channel.consume(rabbitMq.queue, getQueueHandler(channel), {noAck: false});
                        });
                        return ok;
                    });
            }).then(null, console.warn);

        function getQueueHandler(channel) {
            return function queueHandler(msg) {
                (async function () {
                    try {
                        var body = JSON.parse(msg.content.toString());
                        if (await handler(body)) {
                            channel.ack(msg);
                        } else {
                            channel.nack(msg, false, false);
                        }
                    } catch (e) {
                        channel.nack(msg, false, false);
                        console.error(e);
                    }
                })();
            };
        }
};



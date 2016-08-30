const amqp = require("amqplib"),
      config = require("config"),
      co = require("co"),
      rabbitMqUrl = ["amqp://", config.rabbitMq.user, ":", config.rabbitMq.password, "@", config.rabbitMq.host, ":", config.rabbitMq.port].join("");

module.exports = function (handler) {
        amqp.connect(rabbitMqUrl)
            .then(function (connection) {
                process.once('SIGINT', function () {
                    connection.close();
                });
                return connection.createChannel()
                    .then(function (channel) {
                        var ok = channel.assertQueue(config.rabbitMq.queue,config.rabbitMq.options || {durable: true});
                        ok = ok.then(function () {
                            channel.prefetch(1);
                        });
                        ok = ok.then(function () {
                            channel.consume(config.rabbitMq.queue, getQueueHandler(channel), {noAck: false});
                        });
                        return ok;
                    });
            }).then(null, console.warn);

        function getQueueHandler(channel) {
            return function queueHandler(msg) {
                co(function *() {
                    try {
                        var body = JSON.parse(msg.content.toString());
                        if (yield handler(body)) {
                            channel.ack(msg);
                        } else {
                            channel.nack(msg, false, false);
                        }
                    } catch (e) {
                        channel.nack(msg, false, false);
                        console.error(e);
                    }
                }).catch(function onerror(err) {
                    channel.nack(msg, false, false);
                    console.error(err.stack);
                });
            };
        }
};



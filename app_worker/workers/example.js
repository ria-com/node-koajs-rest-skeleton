"use strict";

(function () {
    var amqpManager = require('../../app/managers/amqpManager');

    function* handler(body) {
        console.log('Processing: ' + JSON.stringify(body));
        // Handle message from queue
        return true;
    }

    amqpManager(handler);

}());


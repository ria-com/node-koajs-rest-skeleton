"use strict";

(function () {
    var config = require("config");
    require('./workers/' + config.worker);
}());
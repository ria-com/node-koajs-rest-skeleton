"use strict";
const convert = require('koa-convert');

/**
 * Body parser
 */
module.exports = function bodyparser(app) {
    var bodyParser = require('koa-bodyparser');
    app.use(convert(bodyParser()));
};

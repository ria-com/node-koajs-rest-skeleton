/**
 * Body parser
 */
module.exports = function bodyparser(app) {
    var bodyParser = require('koa-bodyparser');
    app.use(bodyParser());
};
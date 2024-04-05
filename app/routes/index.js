const Router = require('koa-router'),
     { koaBody } = require('koa-body'),
     {getId, list, createItem, updateItem, removeItem} = require('../controllers/indexController');

const router = new Router();

    router
        .get('/users',        list)
        .get('/users/:id',    getId)
        .post('/users/',      koaBody(), createItem)
        .put('/users/:id',    koaBody(), updateItem)
        .delete('/users/:id', removeItem);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};

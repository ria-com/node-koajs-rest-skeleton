const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {getId, list, createItem, updateItem, removeItem} = require('../controllers/indexController');

const router = new Router();

    router
        .get('/users',        list)
        .get('/users/:id',    getId)
        .post('/users/',      KoaBody(), createItem)
        .put('/users/:id',    KoaBody(), updateItem)
        .delete('/users/:id', removeItem);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};

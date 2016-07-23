module.exports = function routes(app) {
    "use strict";

    const Router = require('koa-router'),
        router = new Router(),
        indexController = require('../controllers/indexController');

    router
        .get('/users',        indexController.list)
        .get('/users/:id',    indexController.getId)
        .post('/users/',      indexController.createItem)
        .put('/users/:id',    indexController.updateItem)
        .delete('/users/:id', indexController.removeItem);

    app.use(router.routes());
    app.use(router.allowedMethods());

};
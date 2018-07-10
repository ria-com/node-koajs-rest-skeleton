const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {getId, list, createItem, updateItem, removeItem} = require('../controllers/indexController'),
     {readyz,healthz, version} = require('../controllers/kubernetesController');

const router = new Router();

    router
        .get('/users',        list)
        .get('/users/:id',    getId)
        .post('/users/',      KoaBody(), createItem)
        .put('/users/:id',    KoaBody(), updateItem)
        .delete('/users/:id', removeItem)

        // Kubernetes features
        .get('/readyz',       readyz)
        .get('/healthz',      healthz)
        .get('/version',      version)

    ;

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};

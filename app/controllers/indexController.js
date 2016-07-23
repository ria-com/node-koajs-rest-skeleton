"use strict";

const myDb = require('../managers/testDbManager'),
      co = require('co');

module.exports = {
    getId: co.wrap(function* getId (ctx, next) {
        ctx.body = yield myDb.getById(ctx.params.id);
        yield next();
    }),

    list: co.wrap(function* list (ctx, next) {
        ctx.body = yield myDb.getAll();
        yield next();
    }),

    createItem: co.wrap(function* createItem (ctx, next) {
        ctx.body = yield myDb.setNewId(ctx.request.body.name);
        ctx.status = 201;
        yield next();
    }),

    updateItem: co.wrap(function* updateItem (ctx, next) {
        ctx.body = yield myDb.updateId(ctx.params.id, ctx.request.body.name);
        yield next();
    }),

    removeItem: co.wrap(function* removeItem (ctx, next) {
        yield myDb.removeId(ctx.params.id);
        ctx.status = 204;
        yield next();
    })
};

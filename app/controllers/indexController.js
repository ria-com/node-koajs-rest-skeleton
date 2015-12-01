(function () {
    "use strict";

    var myDb = require('../managers/testDbManager');

    module.exports = {

        getId:function getId (ctx, next) {
            ctx.body = myDb.getById(ctx.params.id) || {};
            next();
        },

        list: function list (ctx, next) {
            ctx.body = myDb.getAll();
            next();
        },

        createItem: function createItem (ctx, next) {
            console.log(ctx.request.body);
            ctx.body = myDb.setNewId(ctx.request.body.name);
            ctx.status = 201;
            next();
        },

        updateItem: function updateItem (ctx, next) {
            console.log(ctx.request.body);
            ctx.body = myDb.updateId(ctx.params.id, ctx.request.body.name);
            next();
        },

        removeItem: function removeItem (ctx, next) {
            myDb.removeId(this.params.id);
            this.status = 204;
            next();
        }
    }
}());
(function () {
    "use strict";

    var myDb = require('../managers/testDbManager');

    module.exports = {

        getId: function * getId (next) {
            this.body = yield myDb.getById(this.params.id);
            yield next;
        },

        list: function * list (next) {
            this.body = yield myDb.getAll();
            yield next;
        },

        createItem: function * createItem (next) {
            this.body = yield myDb.setNewId(this.request.body.name);
            this.status = 201;
            yield next;
        },

        updateItem: function * updateItem (next) {
            this.body = yield myDb.updateId(this.params.id, this.request.body.name);
            yield next;
        },

        removeItem: function * removeItem (next) {
            yield myDb.removeId(this.params.id);
            this.status = 204;
            yield next;
        }
    }
}());
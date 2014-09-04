(function () {
    "use strict";

    var db = [
        {id:0, name: "test0" },
        {id:1, name: "test1" },
        {id:2, name: "test2" }
    ];

    module.exports = {
        getAll: function * getAllFromDb() { return db },
        getById: function * getIdFromDb(id) {
            return db[parseInt(id)];
        },
        setNewId: function * setNewIdToDb(name) {
            var length = db.length;
            db.push({id: length, name: name});
            return db[parseInt(length)];
        },
        updateId: function * updateIdToDb(id,name) {
            db[parseInt(id)] = {id: parseInt(id), name: name};
            return db[parseInt(id)];
        },
        removeId: function * removeIdInDb(id) {
            delete db[parseInt(id)];
        }
    }
}());
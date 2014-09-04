var myDb = require('../app/managers/testDbManager'),
    co = require('co'),
    item = {id:2, name: "test2" };

describe('myDB Tests', function () {

    it("Get access to data from manager", co(function* myDBTests() {
        var err;
        try {
            var allData = yield myDb.getAll();
        } catch (e) {
            err = e;
        }
        expect(allData.length).toEqual(3);

        try {
            var myItem= yield myDb.getById(2);
        } catch (e) {
            err = e;
        }

        expect(myItem).toEqual(item);
        expect(err).toBeUndefined();
    }))
});
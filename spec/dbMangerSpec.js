var myDb = require('../app/managers/testDbManager');

describe('myDB Tests', function () {

    it("Get access to data from manager", function () {
        var item = {id:2, name: "test2" };
        expect(myDb.getAll().length).toEqual(3);
        expect(myDb.getById(2)).toEqual(item);
    });
});
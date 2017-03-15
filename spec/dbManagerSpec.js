const myDb = require('../app/managers/testDbManager'),
      item = {id:2, name: "test2" };

describe('myDB Tests', function () {

    it("Get access to data from manager", function myDBTests(done) {

        let failTest = function(err) {
            expect(err).toBeUndefined();
            done();
        };

        myDb.getAll()
            .then(function(allData) {
                expect(allData.length).toEqual(3);
                done();
            })
            .catch(failTest);

        myDb.getById(2)
            .then(function(myItem) {
                expect(myItem).toEqual(item);
                done();
            })
            .catch(failTest);
    })
});
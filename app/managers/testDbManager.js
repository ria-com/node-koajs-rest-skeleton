"use strict";

const db = require('../../data/users.json'),
      fakeDelay=100;

module.exports = {

    /**
     * Get all records from memory DB
     * @return {Promise}
     */
    getAll: function getAllFromDb() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(db || []);
            }, fakeDelay);
        });
    },

    /**
     * Get record by id from memory DB
     * @param id
     * @return {Promise}
     */
    getById: function getIdFromDb(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(db[parseInt(id)] || {});
            }, fakeDelay);
        });
    },

    /**
     * Add new record to memory DB
     * @param name
     * @return {Promise}
     */
    setNewId: function setNewIdToDb(name) {
        let length = db.length;
        db.push({id: length, name: name});
        return module.exports.getById(length);
    },

    /**
     * Update record into memory DB
     * @param id
     * @param name
     * @return {Promise}
     */
    updateId: function updateIdToDb(id,name) {
        db[parseInt(id)] = {id: parseInt(id), name: name};
        return module.exports.getById(id);
    },

    /**
     * Remove record from memory DB
     * @param id
     * @return {Promise}
     */
    removeId: function removeIdInDb(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (parseInt(id) === (db.length-1)) {
                    db.pop();
                } else {
                    delete db[parseInt(id)];
                }
                resolve();
            }, fakeDelay);
        });
    }
};

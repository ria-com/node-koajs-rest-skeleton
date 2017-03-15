require('get-port')().then(port => {
    process.env.NODE_APP_INSTANCE = port;

    const frisby = require('frisby');
      config = require('config'),
      api = require('../app/app.js'),
      db = require('../data/users.json'),
      newItem = {id:3, name:"А-ба-ба-га-ла-ма-га"},
      updatedItem = {id:3, name:"A-ba-ba-ga-la-ma-ga"},
      itemTypes = {
          id: Number,
          name: String
      },
      baseUrl = `http://localhost:${config.server.port}`;

    // Get all users request
    frisby.create('Get all users')
    .get(`${baseUrl}/users`)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(db)
    .expectJSONTypes('0', itemTypes)
    .afterJSON(function () {

        // Create new user request
        frisby.create('Create new user')
        .post(`${baseUrl}/users`, newItem)
        .expectStatus(201)
        .afterJSON(function () {

            // Check new user request
            frisby.create('Check new user')
            .get(`${baseUrl}/users/${newItem.id}`)
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON(newItem)
            .expectJSONTypes(itemTypes)
            .afterJSON(function () {

                // Update user request
                frisby.create('Update user')
                .put(`${baseUrl}/users/${newItem.id}`, updatedItem)
                .expectStatus(200)
                .expectHeaderContains('content-type', 'application/json')
                .expectJSON(updatedItem)
                .expectJSONTypes(itemTypes)
                .afterJSON(function () {

                    // Get updated user request
                    frisby.create('Get updated user')
                    .get(`${baseUrl}/users/${newItem.id}`)
                    .expectStatus(200)
                    .expectJSON(updatedItem)
                    .expectHeaderContains('content-type', 'application/json')
                    .afterJSON(function () {

                        // Delete updated user request
                        frisby.create('Delete updated user')
                        .delete(`${baseUrl}/users/${newItem.id}`)
                        .expectStatus(204)
                        .after(function (err) {
                            if (err) fail(err);
                            api.closeServer();
                        })
                        .toss();
                    })
                    .toss();
                })
                .toss();
            })
            .toss();
        })
        .toss();
    })
    .toss()
});
jasmine.getEnv().defaultTimeoutInterval = 10000;
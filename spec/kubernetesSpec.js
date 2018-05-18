const frisby = require('frisby'),
    config = require('config'),
    healthUri = '/healthz',
    readyUri = '/readyz'
;

require('get-port')().then(port => {
    config.server.port = port;
    const api = require('../app/app.kubernetes.js'),
          baseUrl = `http://localhost:${config.server.port}`,
         {setHealth,setReady} = require('../app/controllers/kubernetesController');

    // Get all users request
    frisby.create('Get health state')
    .get(`${baseUrl}${healthUri}`)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
    .expectBodyContains('Service is live')
    .after(function () {
        // Chenge app health state
        setHealth(false);
        frisby.create('Get broken health state')
        .get(`${baseUrl}${healthUri}`)
        .expectStatus(503)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .expectBodyContains('Service is broken')
        .after(function (err) {
            // Get all users request
            frisby.create('Get ready state')
                .get(`${baseUrl}${readyUri}`)
                .expectStatus(200)
                .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
                .expectBodyContains('Service is redy to new requests')
                .after(function () {
                    // Chenge app health state
                    setReady(false);
                    frisby.create('Get temporrary "not ready" state')
                        .get(`${baseUrl}${readyUri}`)
                        .expectStatus(503)
                        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
                        .expectBodyContains('Service Temporary Unavailable')
                        .after(function (err) {
                            if (err) fail(err);
                            api.closeServer();
                        })
                        .toss();
                })
                .toss()
        })
        .toss();
    })
    .toss()


});
jasmine.getEnv().defaultTimeoutInterval = 10000;
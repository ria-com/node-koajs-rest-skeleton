const config = require('config'),
      toTime = require('to-time')
;
let lifeTime = 0;

if (config.server.lifeTime != undefined && Number(config.server.lifeTime) != 0 ) {
    try {
       lifeTime = toTime(config.server.lifeTime).milliseconds();
    } catch (e) {
        console.log(`lifeTime variable "${config.server.lifeTime}" incorrect, please use syntax from https://www.npmjs.com/package/to-time , for example: "5m 30s" `)
    }
    config.server.lifeTimeMS = lifeTime;
}

module.exports = (server) => {
    if (lifeTime) {
        console.log(`Set server life time to %s`, toTime.fromMilliseconds(lifeTime).humanize());
        config.server.startTimeMS = (new Date()).getTime();
        setTimeout(()=>{
            console.log('Autoshutdown %s', config.app.name);
            server.close();
        }, lifeTime);
    }
};
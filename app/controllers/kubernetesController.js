const config = require('config');

let healthStatus = true,
    readyStatus = true;

module.exports = {

    /**
     * Is service live
     * @param ctx
     * @param next
     * @return {Promise<void>}
     */
    async healthz(ctx, next) {
        let available = 200,
            message;

        ctx.type = 'text/plain';
        console.log(`healthStatus ${healthStatus}!`);
        if (healthStatus) {
            message = `Service is live`;
            available = 200;
        } else {
            message = `Service is broken`;
            available = 503;
        }
        ctx.status = available;
        ctx.body = message;
        console.log(`Set "healthz" return code to ${available}!`);
        await next();
    },


    /**
     * Is ready service to new requests
     * @param ctx
     * @param next
     * @return {Promise<void>}
     */
    async readyz(ctx, next) {
        let available = 200,
            message;

        ctx.type = 'text/plain';
        console.log(`readyStatus ${readyStatus}!`);
        if (readyStatus) {
            message = `Service is redy to new requests`;
            available = 200;
        } else {
            message = `Service Temporary Unavailable`;
            available = 503;
        }
        ctx.status = available;
        ctx.body = message;
        console.log(`Set "readyz" return code to ${available}!`);
        await next();
    },

    /**
     * Set health status
     * @param {boolean} status
     */
    setHealth(status = true) {
        healthStatus = status
    },

    /**
     * Set ready status
     * @param {boolean} status
     */
    setReady(status = true) {
        readyStatus = status
    },

    /**
     * Get version of app
     */
    async version(ctx, next) {
        ctx.body = {
            name: config.app.name,
            version: config.app.version
        };
        await next();
    }
};
const client = require('prom-client');
const debug = require('debug')('prometheus:middleware');
require('prometheus-gc-stats')(client.register)();

client.collectDefaultMetrics();
// setup metrics.
const labelNames = ['method', 'handler', 'code'];
const httpRequestsTotal = new client.Counter({
    labelNames,
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
});

const httpRequestDurationMicroseconds = new client.Summary({
    labelNames,
    name: 'http_request_duration_microseconds',
    help: 'Duration of HTTP requests in microseconds',
});

const httpRequestSizeBytes = new client.Summary({
    labelNames,
    name: 'http_request_size_bytes',
    help: 'Duration of HTTP requests size in bytes',
});

const httpResponseSizeBytes = new client.Summary({
    labelNames,
    name: 'http_response_size_bytes',
    help: 'Duration of HTTP response size in bytes',
});

function getMicroseconds() {
    const now = process.hrtime();
    return now[0] * 1000000 + now[1] / 1000;
}

module.exports = {
    client,
    middleware: (options = {}) => {
        const path = options.path || '/metrics';
        const { headerBlacklist } = options;
        return async (ctx, next) => {
            ctx.state.prometheus = client;
            if (ctx.path === path) {
                if (ctx.method.toLowerCase() === 'get') {
                    debug('GET /%s', path);
                    if (
                        !headerBlacklist ||
                        headerBlacklist.filter(h => {
                            return Object.keys(ctx.headers).includes(h);
                        }).length === 0
                    ) {
                        ctx.set('Content-Type', client.register.contentType);
                        ctx.body = client.register.metrics();
                        return null;
                    }
                    ctx.throw(403, 'Forbidden');
                }
                ctx.throw(405, 'Method not allowed');
            } else {
                await next();
            }
        };
    },
    httpMetricMiddleware: (pathDeepLevel = 3) => {
        return async (ctx, next) => {
            const startEpoch = getMicroseconds();
            await next();
            let path = ctx.request.path.split('/').slice(0,pathDeepLevel).join('/');
            if (ctx.request.length) {
                httpRequestSizeBytes
                    .labels(
                        ctx.request.method,
                        path, // ctx.request.path
                        ctx.response.status
                    )
                    .observe(ctx.request.length);
            }
            if (ctx.response.length) {
                httpResponseSizeBytes
                    .labels(
                        ctx.request.method,
                        path, // ctx.request.path
                        ctx.response.status
                    )
                    .observe(ctx.response.length);
            }
            httpRequestDurationMicroseconds
                .labels(ctx.request.method, path /* ctx.request.path */, ctx.response.status)
                .observe(getMicroseconds() - startEpoch);
            httpRequestsTotal
                .labels(ctx.request.method, path /* ctx.request.path */, ctx.response.status)
                .inc();
        }
    }
};

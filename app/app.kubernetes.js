const http = require('http'),
      Koa = require('koa'),
      config = require('config'),
      // prometheus = require('@echo-health/koa-prometheus-exporter'),
      prometheus = require('./helpers/prometheus'),
      httpMetrics = prometheus.httpMetricMiddleware(),
      err = require('./helpers/error'),
      autoshutdown = require('./helpers/autoshutdown'),
     {routes, allowedMethods}  = require('./routes/index.kubernetes'),
      app = new Koa();

app.use(err);
app.use(httpMetrics);
app.use(prometheus.middleware({}));
app.use(routes());
app.use(allowedMethods());

const server = http.createServer(app.callback()).listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});

autoshutdown(server);

module.exports = {
    closeServer() {
        server.close();
    }
};
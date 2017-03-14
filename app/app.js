const Koa = require('koa'),
      config = require('config'),
      err = require('./helpers/error'),
     {routes, allowedMethods}  = require('./routes'),
      app = new Koa();

app.use(err);
app.use(routes());
app.use(allowedMethods());

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});

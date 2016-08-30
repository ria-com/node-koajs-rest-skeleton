import Koa from 'koa';
import config from  'config';
import err from './helpers/error';
import {routes, allowedMethods} from './routes';

const app = new Koa();

app.use(err);
app.use(routes());
app.use(allowedMethods());

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});

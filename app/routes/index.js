import Router from 'koa-router';
import KoaBody from 'koa-body';
import {getId, list, createItem, updateItem, removeItem} from '../controllers/indexController';

const router = new Router();

    router
        .get('/users',        list)
        .get('/users/:id',    getId)
        .post('/users/',      KoaBody(), createItem)
        .put('/users/:id',    KoaBody(), updateItem)
        .delete('/users/:id', removeItem);

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }
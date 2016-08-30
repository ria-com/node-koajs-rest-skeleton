import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import {getId, list, createItem, updateItem, removeItem} from '../controllers/indexController';

const router = new Router(),
    koaBody = convert(KoaBody());

    router
        .get('/users',        list)
        .get('/users/:id',    getId)
        .post('/users/',      koaBody, createItem)
        .put('/users/:id',    koaBody, updateItem)
        .delete('/users/:id', removeItem);

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }
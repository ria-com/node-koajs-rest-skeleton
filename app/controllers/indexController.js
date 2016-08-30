import myDb from '../managers/testDbManager';

async function getId (ctx, next) {
    ctx.body = await myDb.getById(ctx.params.id);
    await next();
}

async function list (ctx, next) {
    ctx.body = await myDb.getAll();
    await next();
}

async function createItem (ctx, next) {
    ctx.body = await myDb.setNewId(ctx.request.body.name);
    ctx.status = 201;
    await next();
}

async function updateItem (ctx, next) {
    ctx.body = await myDb.updateId(ctx.params.id, ctx.request.body.name);
    await next();
}

async function removeItem (ctx, next) {
    await myDb.removeId(ctx.params.id);
    ctx.status = 204;
    await next();
}

export {getId, list, createItem, updateItem, removeItem};
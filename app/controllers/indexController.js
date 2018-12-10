const myDb = require('../managers/testDbManager'),
      Joi = require('joi'),

    // Simple user schema, more info: https://github.com/hapijs/joi
      userSchema = Joi.object().keys({
          name: Joi.string().trim().required()
      });

/**
 * @example curl -XGET "http://localhost:8081/users/1"
 */
async function getId (ctx, next) {
    ctx.body = await myDb.getById(ctx.params.id);
    await next();
}

/**
* @example curl -XGET "http://localhost:8081/users"
*/
async function list (ctx, next) {
    ctx.body = await myDb.getAll();
    await next();
}

/**
 * @example curl -XPOST "http://localhost:8081/users" -d '{"name":"New record 1"}' -H 'Content-Type: application/json'
 */
async function createItem (ctx, next) {
    // Joi validation, more info: https://github.com/hapijs/joi
    let body = await Joi.validate(ctx.request.body, userSchema, {allowUnknown: true});
    ctx.body = await myDb.setNewId(body.name);
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPUT "http://localhost:8081/users/3" -d '{"name":"New record 3"}' -H 'Content-Type: application/json'
 */
async function updateItem (ctx, next) {
    // Joi validation, more info: https://github.com/hapijs/joi
    let body = await Joi.validate(ctx.request.body, userSchema, {allowUnknown: true});
    ctx.body = await myDb.updateId(ctx.params.id, body.name);
    await next();
}

/**
 * @example curl -XDELETE "http://localhost:8081/users/3"
 */
async function removeItem (ctx, next) {
    await myDb.removeId(ctx.params.id);
    ctx.status = 204;
    await next();
}

module.exports = {getId, list, createItem, updateItem, removeItem};

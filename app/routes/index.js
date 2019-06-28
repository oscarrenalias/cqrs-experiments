// REST framework
const fastify = require('fastify')({ logger: true }),
      models = require('../models');

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

function Error(message) {
    return({
        "message": message,
        "timestamp": (new Date()).toString(),
        "UUID": "uuid"
    })
}

// accounts
fastify.get('/accounts/:accountId', async (request, reply) => {
    var account = await models.Account.findByPk(request.params.accountId)
    if(account === null) {
        reply.code(404);
        reply.send(Error("Not Found"))
    }
    else {
        reply.code(404);
        reply.send(account);
    }
})

module.exports.fastify = fastify;
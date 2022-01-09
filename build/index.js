"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
});
const init = async () => {
    const server = new hapi_1.Server({
        port: 4000,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, h) {
                return "<html> <head>server is running!</head><body><h1> Welcome to Dashboard</h1></body></html>";
            }
        },
        {
            method: 'GET',
            path: '/users',
            handler: function (request, h) {
                return 'You are getting users list!';
            }
        },
        {
            method: 'POST',
            path: '/users',
            handler: async function (request, h) {
                let userInfo = request.payload.body;
                const validation = userSchema.validate(userInfo);
                return { validation };
            }
        }
    ]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();

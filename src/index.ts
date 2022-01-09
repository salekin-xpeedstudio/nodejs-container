import { Server, Request, ResponseToolkit } from "@hapi/hapi";
const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
});

const init = async () => {

    const server: Server = new Server({
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
            handler: function (request: Request, h: ResponseToolkit) {
                return "<html> <head>Server is running!</head><body><h1> Welcome to Dashboard!</h1></body></html>";
            }
        },
        {
            method: 'GET',
            path: '/users',
            handler: function (request: Request, h: ResponseToolkit) {

                return 'You are getting users list!';

            }
        },
        {
            method: 'POST',
            path: '/users',
            handler: async function (request: Request, h: ResponseToolkit) {
                interface data {
                    body: any
                    name: string
                    email: string
                }
                let userInfo = (request.payload as data).body;

                const validation = userSchema.validate(userInfo);
                return { validation }
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
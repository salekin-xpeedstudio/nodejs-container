'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');

const users = [
    {
        username: 'demo',
        password: '$2b$10$nIoKEV7Qlecc/lVhaiJ3supmwuiUej3ZRP8Z6zdCsaDc4A4bUN7k2',   // 'secret'
        name: 'Salekin',
        id: '2133d32a'
    }
];

const start = async () => {

    const server = Hapi.server({ 
        port: 3000,
        host: 'localhost'
     });

    await server.register(require('@hapi/cookie'));

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'sid-example',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false
        },
        redirectTo: '/login',
        validateFunc: async (request, session) => {

            const account = users.find(
                (user) => (user.id === session.id)
            );

            if (!account) {

                return { valid: false };
            }

            return { valid: true, credentials: account };
        }
    });

    server.auth.default('session');

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, h) {

                return 'Welcome to the restricted home page!';
            }
        },
        {
            method: 'GET',
            path: '/login',
            handler: function (request, h) {

                return ` <html>
                            <head>
                                <title>Login page</title>
                            </head>
                            <body>
                                <h3>Please Log In</h3>
                                <form method="post" action="/login">
                                    Username: <input type="text" name="username"><br>
                                    Password: <input type="password" name="password"><br/>
                                <input type="submit" value="Login"></form>
                            </body>
                        </html>`;
            },
            options: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/login',
            handler: async (request, h) => {
                const { username, password } = request.payload;
               
                const account = users.find(
                    (user) => user.username === username
                );

                if (!account || !(await Bcrypt.compare(password, account.password))) {

                    return h.redirect('/login');
        }

                request.cookieAuth.set({ id: account.id });

                return h.redirect('/');
             },
             options: {
                 auth: {
                     mode: 'try'
                 }
             }
        }
    ]);

    await server.start();

    console.log('server running at: ' + server.info.uri);
};

start();
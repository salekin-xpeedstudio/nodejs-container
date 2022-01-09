"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
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
            handler: function (request, h) {
                return __awaiter(this, void 0, void 0, function* () {
                    let userInfo = request.payload.body;
                    const validation = userSchema.validate(userInfo);
                    return { validation };
                });
            }
        }
    ]);
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=index.js.map
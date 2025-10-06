"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const googleAuthService_1 = require("../services/googleAuthService");
const mongoService_1 = require("../services/mongoService");
class UserController {
    constructor() {
        this.saveUser = (req, res, next) => {
            const emailPromise = this.googleAuthService.getEmail(req.body.token);
            emailPromise.then(email => {
                console.log(email);
                this.mongoService.save(email);
                res.json({ email: email });
            })
                .catch(error => next(error));
        };
        this.googleAuthService = new googleAuthService_1.GoogleAuthService('927647679318-36n4dvep88921pp6m9m7stmh092p8ufh.apps.googleusercontent.com');
        this.mongoService = new mongoService_1.MongoService('mongodb://localhost:27017');
    }
}
exports.UserController = UserController;

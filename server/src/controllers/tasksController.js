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
exports.TasksController = void 0;
const mongoService_1 = require("../services/mongoService");
const tokenService_1 = require("../services/tokenService");
class TasksController {
    constructor() {
        this.getTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer TOKEN'
                if (!token) {
                    res.status(401).json({ message: 'Access token required' });
                }
                console.log('got getTasks request');
                const decodedToken = this.tokenService.verifyAccessToken(token);
                const email = decodedToken.sub;
                console.log('user: ' + email);
                const taskResults = yield this.mongoService.getTasks(email);
                console.log('task results: ', taskResults);
                const convertedTasks = taskResults.map(task => ({
                    title: task.title,
                    description: task.description,
                }));
                console.log('tasks abc: ', convertedTasks);
                res.status(200).json({
                    tasks: convertedTasks
                });
            }
            catch (error) {
                console.error('Error during user creation:', error);
                res.status(400).json({ message: 'Invalid credentials' });
                next(error);
            }
        });
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer TOKEN'
            if (!token) {
                res.status(401).json({ message: 'Access token required' });
            }
            console.log('got createTasks request with token: ' + token + '');
            const decodedToken = this.tokenService.verifyAccessToken(token);
            const email = decodedToken.sub;
            console.log('user: ' + email);
            console.log(req);
            console.log('body: ', req.body);
            yield this.mongoService.createTasks(email, req.body.title, req.body.description);
            res.status(200).send();
        });
        this.mongoService = new mongoService_1.MongoService('mongodb://localhost:27017');
        this.tokenService = new tokenService_1.TokenService();
    }
}
exports.TasksController = TasksController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupRoutes_1 = __importDefault(require("./apis/signupRoutes"));
const loginController_1 = require("../../controllers/loginController");
const tokenController_1 = require("../../controllers/tokenController");
const tasksController_1 = require("../../controllers/tasksController");
const router = (0, express_1.Router)();
const loginController = new loginController_1.LoginController();
const tokenController = new tokenController_1.TokenController();
const tasksController = new tasksController_1.TasksController();
router.use('/signup', signupRoutes_1.default); // POST /api/users
router.post('/login', loginController.login); // POST /api/users
router.post('/token', tokenController.grantToken);
router.post('/logout', loginController.logout);
router.post('/protected', loginController.protectedApi);
router.post('/tasks', tasksController.getTasks);
router.post('/createTask', tasksController.createTask);
exports.default = router;

import { Router } from 'express';
import { createLoginController } from '../../controllers/loginController';
import {createTokenController, TokenController} from '../../controllers/tokenController';
import {createTasksController} from "../../controllers/tasksController";
import {createMongoService, MongoService} from "../../services/mongoService";
import {TokenService} from "../../services/tokenService";
import {getMongoConnectionManager} from "../../dependencies/mongoConnectionManager";
import {createSignupController} from "../../controllers/signupController";
import {createUserController} from "../../controllers/userController";
import {GoogleAuthService} from "../../services/googleAuthService";

const router = Router();

// initialize dependencies
const mongoConnectionManager = getMongoConnectionManager();
const mongoService = createMongoService({mongoConnectionManager});
const tokenService = new TokenService();
const refreshTokens: string[] = [];
const googleAuthService = new GoogleAuthService('927647679318-36n4dvep88921pp6m9m7stmh092p8ufh.apps.googleusercontent.com');

// initialize controllers
const tokenController = createTokenController({ mongoService, tokenService});

const functionalLoginController = createLoginController({
   mongoService: mongoService,
   tokenService: tokenService,
   refreshTokens: refreshTokens,
});

const tasksController = createTasksController({ mongoService, tokenService });

const signupController = createSignupController({ mongoService });
const userController = createUserController({ mongoService, googleAuthService })

// register routes

// signup
router.use('/signup', signupController.signup);  // POST /api/users

// login
router.post('/login', functionalLoginController.login);  // POST /api/uses
router.post('/logout', functionalLoginController.logout);
router.post('/protected', functionalLoginController.protectedApi);

// tokens
router.post('/token', tokenController.grantToken);

// google auth
router.post('/auth/google', userController.saveUser);

// tasks
router.post('/tasks', tasksController.getTasks)
router.post('/createTask', tasksController.createTask)

export default router;
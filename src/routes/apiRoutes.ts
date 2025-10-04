import { Router } from 'express';
import signupRoutes from './apis/signupRoutes';
import { LoginController } from '../controllers/loginController';
import { TokenController } from '../controllers/tokenController';
import {TasksController} from "../controllers/tasksController";

const router = Router();
const loginController = new LoginController();
const tokenController = new TokenController();
const tasksController = new TasksController();

router.use('/signup', signupRoutes);  // POST /api/users


router.post('/login', loginController.login);  // POST /api/users

router.post('/token', tokenController.grantToken);

router.post('/logout', loginController.logout);

router.post('/protected', loginController.protectedApi);

router.post('/tasks', tasksController.getTasks)

export default router;
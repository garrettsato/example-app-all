import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const controller: UserController = new UserController();

router.post('/', controller.saveUser);  // POST /api/users

export default router;
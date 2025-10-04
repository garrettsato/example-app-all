import { Router } from 'express';
import { SignupController } from '../../controllers/signupController';

const router = Router();
const controller: SignupController = new SignupController();


router.post('/', controller.signup);  // POST /api/users

export default router;
import { Request, Response, NextFunction } from 'express';
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';

export interface SignupControllerDependencies {
    mongoService: MongoService;
}

export interface SignupController {
    signup: (req: Request, res: Response, next: NextFunction) => void;
}

export function createSignupController(deps: SignupControllerDependencies): SignupController {
    const signup = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body.email);
        this.hashPassword(req.body.password)
            .then((hashedPassword) => {
                this.mongoService.createUser(req.body.email, hashedPassword)
            })
            .then((data) => {
                console.log('User created:', data);
            })
            .catch((error) => {
                console.error('Error during user creation:', error);
            });

        res.json({ email: req.body.email});
    }

    const hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };

    return { signup }
}

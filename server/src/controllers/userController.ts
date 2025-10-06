import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'

export interface UserControllerDependencies {
    googleAuthService: GoogleAuthService;
    mongoService: MongoService;
}

export interface UserController {
    saveUser: (req: Request, res: Response, next: NextFunction) => void;
}

export function createUserController(dependencies: UserControllerDependencies): UserController {
    const { googleAuthService, mongoService } = dependencies;
    const saveUser = async (req: Request, res: Response, next: NextFunction) => {
        const emailPromise: Promise<string> = googleAuthService.getEmail(req.body.token);

        emailPromise.then(email => {
            console.log(email);
            mongoService.save(email);
            res.json({ email: email });
        })
            .catch(error => next(error));
    }
    return { saveUser }
}


import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';

export class SignupController {
    private mongoService: MongoService;
    constructor() {
        this.mongoService = new MongoService('mongodb://localhost:27017');
    }

    signup = async (req: Request, res: Response, next: NextFunction) => {
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

    hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };
}

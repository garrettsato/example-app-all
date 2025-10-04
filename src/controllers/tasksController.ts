import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

export class TasksController {
    private mongoService: MongoService;
    private tokenService: TokenService;

    constructor() {
        this.mongoService = new MongoService('mongodb://localhost:27017');
        this.tokenService = new TokenService();
    }


    getTasks = async (req: Request, res: Response, next: NextFunction) => {
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
            const taskResults = await this.mongoService.getTasks(email);

            console.log('task results: ', taskResults);

            const convertedTasks = taskResults.map(task => ({
                title: task.title,
                description: task.description,
            }));

            console.log('tasks abc: ', convertedTasks);

            res.status(200).json({
                tasks: convertedTasks
            });
        } catch (error) {
            console.error('Error during user creation:', error);
            res.status(400).json({ message: 'Invalid credentials' });
            next(error);
        }
    }

    createTask = async (req: Request, res: Response, next: NextFunction) => {
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
        await this.mongoService.createTasks(email, req.body.title, req.body.description);

        res.status(200).send();
    }

}

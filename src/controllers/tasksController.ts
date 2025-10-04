import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

export class TasksController {
    private mongoService: MongoService;

    constructor() {
    }


    getTasks = async (req: Request, res: Response, next: NextFunction) => {
        console.log('got getTasks request');

        res.status(200).json({
             tasks:   [
                { title: 'Task 7', description: 'Description 1' },
                { title: 'Task 8', description: 'Description 2' },
                { title: 'Task 9', description: 'Description 3' }
            ]
        });
    }


}

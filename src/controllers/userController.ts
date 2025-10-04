import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'

export class UserController {
    private googleAuthService: GoogleAuthService;
    private mongoService: MongoService;
    constructor() {
        this.googleAuthService = new GoogleAuthService('927647679318-36n4dvep88921pp6m9m7stmh092p8ufh.apps.googleusercontent.com');
        this.mongoService = new MongoService('mongodb://localhost:27017');
    }

    saveUser = (req: Request, res: Response, next: NextFunction) => {
        const emailPromise: Promise<string> = this.googleAuthService.getEmail(req.body.token);
      
        emailPromise.then(email => {
          console.log(email);
          this.mongoService.save(email);
          res.json({ email: email });
        })
        .catch(error => next(error));
    }
}

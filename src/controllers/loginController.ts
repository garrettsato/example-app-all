import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

export class LoginController {
    private mongoService: MongoService;
    private tokenService: TokenService;
    private refreshTokens: string[];
    constructor() {
        this.mongoService = new MongoService('mongodb://localhost:27017');
        this.tokenService = new TokenService();
        this.refreshTokens = [];
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body.email);
        try {
            const hashedPassword = await this.mongoService.getHashedPassword(req.body.email);
            if (!hashedPassword) {
                res.status(400).json({message: "User not found"});
                return;
            }

            const isAuthorized = await this.verifyPassword(req.body.password, hashedPassword);

            console.log('Auth result:', isAuthorized);
            if (!isAuthorized) {
                res.status(400).json({message: 'Invalid credentials'});
                return;
            }

            const accessToken = this.tokenService.vendAccessToken(req.body.email);
            const refreshToken = this.tokenService.vendRefreshToken(req.body.email);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            this.refreshTokens.push(refreshToken);

            res.json({accessToken})

        } catch(error) {
            console.error('Error during user creation:', error);
            res.status(400).json({ message: 'Invalid credentials' });
            next(error);
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;
        this.refreshTokens = this.refreshTokens.filter(token => token !== refreshToken);
        console.log('got logout request');
        
        res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
        
        res.status(204).send();
    }

    protectedApi = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer TOKEN'
      
        if (!token) {
            res.status(401).json({ message: 'Access token required' });
        }
      
        try {
            const decodedToken = this.tokenService.verifyAccessToken(token);
            const user = decodedToken.sub;
            res.json({ message: `Hello ${user}` });
        } catch (error) {
            res.status(403).json({ message: 'Invalid access token' });
        }
    }

    verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    };
}

import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

export class TokenController {
    private mongoService: MongoService;
    private tokenService: TokenService;
    constructor() {
        this.mongoService = new MongoService('mongodb://localhost:27017');
        this.tokenService = new TokenService();
    }

    grantToken = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) res.status(401).json({ message: 'Refresh token not found' });
      
        try {
            const decodedToken = this.tokenService.verifyRefreshToken(refreshToken);
            const tokenSub = decodedToken['sub'];
            const newAccessToken = this.tokenService.vendAccessToken(tokenSub);
            res.json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json({ message: 'Invalid refresh token' });
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body.email);
        this.mongoService.getHashedPassword(req.body.email)
        .then((hashedPassword) => {
            return this.verifyPassword(req.body.password, hashedPassword)
        })
        .then((isAuthorized) => {
            console.log('Auth result:', isAuthorized);
            if (!isAuthorized) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const accessToken = this.tokenService.vendAccessToken(req.body.email);
            const refreshToken = this.tokenService.vendRefreshToken(req.body.email);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            res.json({ accessToken })
        })
        .catch((error) => {
          console.error('Error during user creation:', error);
        });
    }

    verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    };
}

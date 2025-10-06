import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

export interface TokenControllerDependencies {
    mongoService: MongoService;
    tokenService: TokenService;
}

export interface TokenController {
    grantToken: (req: Request, res: Response, next: NextFunction) => void;
    login: (req: Request, res: Response, next: NextFunction) => void;
}

export function createTokenController(dependencies: TokenControllerDependencies): TokenController {
    const grantToken = async (req: Request, res: Response, next: NextFunction) => {
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

    const login = async (req: Request, res: Response, next: NextFunction) => {
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

    const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    };

    return { login, grantToken };
}


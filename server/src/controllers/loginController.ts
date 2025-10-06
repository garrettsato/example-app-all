import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../services/googleAuthService'
import { MongoService } from '../services/mongoService'
import bcrypt from 'bcrypt';
import { TokenService } from '../services/tokenService';

interface loginControllerDependencies {
    mongoService: MongoService;
    tokenService: TokenService;
    refreshTokens: string[];
}

export function createLoginController(deps: loginControllerDependencies) {
    let { mongoService, tokenService, refreshTokens } = deps;

    const login= async (req: Request, res: Response, next: NextFunction) => {
        console.log('new fancy way');
        console.log(req.body.email);
        try {
            const hashedPassword = await mongoService.getHashedPassword(req.body.email);
            if (!hashedPassword) {
                res.status(400).json({message: "User not found"});
                return;
            }

            const isAuthorized = await verifyPassword(req.body.password, hashedPassword);

            console.log('Auth result:', isAuthorized);
            if (!isAuthorized) {
                res.status(400).json({message: 'Invalid credentials'});
                return;
            }

            const accessToken = tokenService.vendAccessToken(req.body.email);
            const refreshToken = tokenService.vendRefreshToken(req.body.email);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            refreshTokens.push(refreshToken);

            res.json({accessToken})

        } catch(error) {
            console.error('Error during user creation:', error);
            res.status(400).json({ message: 'Invalid credentials' });
            next(error);
        }
    }

    const logout = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        console.log('got logout request');

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.status(204).send();
    }

    const protectedApi = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer TOKEN'

        if (!token) {
            res.status(401).json({ message: 'Access token required' });
        }

        try {
            const decodedToken = tokenService.verifyAccessToken(token);
            const user = decodedToken.sub;
            res.json({ message: `Hello ${user}` });
        } catch (error) {
            res.status(403).json({ message: 'Invalid access token' });
        }
    }

    const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    };

    return { login, logout, protectedApi };
}

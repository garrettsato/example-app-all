import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenService {
    public vendAccessToken(email: string): string {
        return jwt.sign(
            { sub: email },
            "some-access-key"
        )
    }

    public verifyAccessToken(accessToken: string): JwtPayload {
        return jwt.verify(accessToken, "some-access-key") as JwtPayload;
    }

    public vendRefreshToken(email: string): string {
        return jwt.sign(
            { sub: email },
            "some-refresh-key"
        )
    }


    public verifyRefreshToken(refreshToken: string): JwtPayload {
        return jwt.verify(refreshToken, "some-refresh-key") as JwtPayload;
    }
}
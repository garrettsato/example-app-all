export class SecretsService {
    public getAccessTokenSecret() {
        return 'some-access-secret';
    }

    public getRefreshTokenSecret() {
        return 'some-refresh-secret';
    }
}
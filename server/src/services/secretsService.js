"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsService = void 0;
class SecretsService {
    getAccessTokenSecret() {
        return 'some-access-secret';
    }
    getRefreshTokenSecret() {
        return 'some-refresh-secret';
    }
}
exports.SecretsService = SecretsService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    vendAccessToken(email) {
        return jsonwebtoken_1.default.sign({ sub: email }, "some-access-key");
    }
    verifyAccessToken(accessToken) {
        return jsonwebtoken_1.default.verify(accessToken, "some-access-key");
    }
    vendRefreshToken(email) {
        return jsonwebtoken_1.default.sign({ sub: email }, "some-refresh-key");
    }
    verifyRefreshToken(refreshToken) {
        return jsonwebtoken_1.default.verify(refreshToken, "some-refresh-key");
    }
}
exports.TokenService = TokenService;

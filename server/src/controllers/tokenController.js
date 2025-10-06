"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const mongoService_1 = require("../services/mongoService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_1 = require("../services/tokenService");
class TokenController {
    constructor() {
        this.grantToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                res.status(401).json({ message: 'Refresh token not found' });
            try {
                const decodedToken = this.tokenService.verifyRefreshToken(refreshToken);
                const tokenSub = decodedToken['sub'];
                const newAccessToken = this.tokenService.vendAccessToken(tokenSub);
                res.json({ accessToken: newAccessToken });
            }
            catch (error) {
                res.status(403).json({ message: 'Invalid refresh token' });
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.email);
            this.mongoService.getHashedPassword(req.body.email)
                .then((hashedPassword) => {
                return this.verifyPassword(req.body.password, hashedPassword);
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
                res.json({ accessToken });
            })
                .catch((error) => {
                console.error('Error during user creation:', error);
            });
        });
        this.verifyPassword = (inputPassword, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcrypt_1.default.compare(inputPassword, hashedPassword);
            return isMatch;
        });
        this.mongoService = new mongoService_1.MongoService('mongodb://localhost:27017');
        this.tokenService = new tokenService_1.TokenService();
    }
}
exports.TokenController = TokenController;

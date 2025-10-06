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
exports.LoginController = void 0;
const mongoService_1 = require("../services/mongoService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_1 = require("../services/tokenService");
class LoginController {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.email);
            try {
                const hashedPassword = yield this.mongoService.getHashedPassword(req.body.email);
                if (!hashedPassword) {
                    res.status(400).json({ message: "User not found" });
                    return;
                }
                const isAuthorized = yield this.verifyPassword(req.body.password, hashedPassword);
                console.log('Auth result:', isAuthorized);
                if (!isAuthorized) {
                    res.status(400).json({ message: 'Invalid credentials' });
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
                res.json({ accessToken });
            }
            catch (error) {
                console.error('Error during user creation:', error);
                res.status(400).json({ message: 'Invalid credentials' });
                next(error);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            this.refreshTokens = this.refreshTokens.filter(token => token !== refreshToken);
            console.log('got logout request');
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            res.status(204).send();
        });
        this.protectedApi = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer TOKEN'
            if (!token) {
                res.status(401).json({ message: 'Access token required' });
            }
            try {
                const decodedToken = this.tokenService.verifyAccessToken(token);
                const user = decodedToken.sub;
                res.json({ message: `Hello ${user}` });
            }
            catch (error) {
                res.status(403).json({ message: 'Invalid access token' });
            }
        });
        this.verifyPassword = (inputPassword, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcrypt_1.default.compare(inputPassword, hashedPassword);
            return isMatch;
        });
        this.mongoService = new mongoService_1.MongoService('mongodb://localhost:27017');
        this.tokenService = new tokenService_1.TokenService();
        this.refreshTokens = [];
    }
}
exports.LoginController = LoginController;

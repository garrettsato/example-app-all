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
exports.SignupController = void 0;
const mongoService_1 = require("../services/mongoService");
const bcrypt_1 = __importDefault(require("bcrypt"));
class SignupController {
    constructor() {
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.email);
            this.hashPassword(req.body.password)
                .then((hashedPassword) => {
                this.mongoService.createUser(req.body.email, hashedPassword);
            })
                .then((data) => {
                console.log('User created:', data);
            })
                .catch((error) => {
                console.error('Error during user creation:', error);
            });
            res.json({ email: req.body.email });
        });
        this.hashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            return hashedPassword;
        });
        this.mongoService = new mongoService_1.MongoService('mongodb://localhost:27017');
    }
}
exports.SignupController = SignupController;

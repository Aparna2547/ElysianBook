"use strict";
// import Ijwt from "../../use_case/interface/jwt";
// import jwt from "jsonwebtoken"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTtokens {
    createJwt(userId, role) {
        const jwtKey = process.env.JWT_KEY;
        if (jwtKey) {
            const token = jsonwebtoken_1.default.sign({ id: userId, role: role }, jwtKey);
            return token;
        }
        throw new Error("JWT_KEY is not defined");
    }
    generateAccessToken(userId, role) {
        const jwtKey = process.env.JWT_KEY;
        if (jwtKey) {
            const accessToken = jsonwebtoken_1.default.sign({ id: userId, role: role }, jwtKey, { expiresIn: '7d' });
            return accessToken;
        }
        throw new Error("Access token is not defined");
    }
    generateRefreshToken(userId) {
        const refreshKey = process.env.REFRESH_TOKEN_SECRET;
        if (refreshKey) {
            const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, refreshKey, { expiresIn: '30d' });
            return refreshToken;
        }
        throw new Error("Access token is not defined");
    }
}
exports.default = JWTtokens;

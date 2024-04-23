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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.adminJWT;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            if (decoded && (!decoded.role || decoded.role != 'admin')) {
                return res.status(401).json({ message: "Not authorized, invalid token" });
            }
            if (decoded) {
                next();
            }
            else {
                return res.status(401).json({ message: "Not authorized, invalid token" });
            }
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
});
exports.protect = protect;

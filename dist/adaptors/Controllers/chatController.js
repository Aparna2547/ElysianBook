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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class chatController {
    constructor(chatusecase) {
        this.chatusecase = chatusecase;
    }
    newConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let senderId;
                let token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    senderId = decoded.id;
                }
                const receiverId = req.query.parlourId;
                console.log('inside chat', senderId, receiverId);
                const newConversation = yield this.chatusecase.newConversation(senderId, receiverId);
                res.status(200).json(newConversation);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('ki', req.query.conversationId);
                const messages = yield this.chatusecase.getMessages(req.query.conversationId);
                res.status(messages.status).json(messages.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ///parllour
    getConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.parlourId;
                console.log("sfsdfsdfsdf", id);
                const conversations = yield this.chatusecase.getConversations(id);
                res.status(conversations.status).json(conversations.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hai');
                const data = req.body;
                console.log(data);
                const message = yield this.chatusecase.addMessage(data);
                res.status(message.status).json(message.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const findUserById = yield this.chatusecase.findUserById(userId);
                res.status(200).json(findUserById);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = chatController;

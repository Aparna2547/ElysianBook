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
Object.defineProperty(exports, "__esModule", { value: true });
class chatUseCase {
    constructor(IUserRepository, IConversation, IMessage) {
        (this.IUserRepository = IUserRepository),
            (this.IConversation = IConversation),
            (this.IMessage = IMessage);
    }
    newConversation(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newConversation = yield this.IConversation.save(senderId, receiverId);
            if (newConversation) {
                return {
                    status: 200,
                    data: newConversation
                };
            }
            else {
                return {
                    status: 401,
                    data: "something went wrong"
                };
            }
        });
    }
    getConversations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversations = yield this.IConversation.getConversation(id);
            return {
                status: 200,
                data: conversations
            };
        });
    }
    getMessages(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Id);
            const messages = yield this.IMessage.getMessages(Id);
            if (messages) {
                return {
                    status: 200,
                    data: messages
                };
            }
            else {
                return {
                    status: 401,
                    data: "No messages"
                };
            }
        });
    }
    addMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sendMessage = yield this.IMessage.save(message);
                return {
                    status: 200,
                    data: sendMessage
                };
            }
            catch (error) {
                return { status: 500, data: "an error occured" };
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUserById = yield this.IConversation.findUserById(userId);
                return {
                    status: 200,
                    data: findUserById
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = chatUseCase;

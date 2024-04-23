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
const conversation_1 = require("../database/conversation");
const userModel_1 = require("../database/userModel");
class conversationRepository {
    save(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationFound = yield conversation_1.conversationModel.findOne({ members: { $all: [senderId, receiverId] } });
                if (conversationFound) {
                    return conversationFound;
                }
                const newConversation = new conversation_1.conversationModel({ members: [senderId, receiverId] });
                return yield newConversation.save();
            }
            catch (error) {
            }
        });
    }
    getConversation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversations = yield conversation_1.conversationModel.find({ members: { $in: [id] } });
            console.log('conversations', conversations);
            if (conversations) {
                return conversations;
            }
            else {
                return null;
            }
        });
    }
    updateUserLastSeen(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield conversation_1.conversationModel.updateMany({ "members.userId": userId }, { $set: { "members.$.lastSeen": data } }, { multi: true });
                if (updateResult.matchedCount === 0) {
                    return {
                        status: 404,
                        data: "User not found in any conversation."
                    };
                }
                return {
                    status: 200,
                    data: "User's lastSeen updated successfully."
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    data: "Failed to update user's lastSeen."
                };
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUserById = yield userModel_1.UserModel.findById(userId, { name: 1 });
                console.log('kdnf', findUserById);
                return findUserById;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = conversationRepository;

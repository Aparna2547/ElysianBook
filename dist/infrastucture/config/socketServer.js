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
const socket_io_1 = require("socket.io");
const conversationRepository_1 = __importDefault(require("../repository/conversationRepository"));
const conversationrepository = new conversationRepository_1.default;
function initializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CORS_URL,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        }
    });
    let users = [];
    const addUser = (userId, socketId) => {
        console.log('adduser', userId);
        const existingUser = users.find(user => user.userId === userId);
        if (existingUser) {
            existingUser.socketId = socketId;
            existingUser.online = true;
        }
        else {
            users.push({ userId, socketId, online: true });
        }
        io.emit("userOnline", users.filter(user => user.online));
    };
    const removeUser = (socketId) => __awaiter(this, void 0, void 0, function* () {
        const user = users.find(user => user.socketId === socketId);
        if (user) {
            user.lastSeen = new Date();
            user.online = false;
            try {
                yield conversationrepository.updateUserLastSeen(user.userId, user.lastSeen);
                io.emit('userStatusChanged', { userId: user.userId, lastSeen: user.lastSeen, online: false });
            }
            catch (error) {
                console.log('failed to update last seen');
            }
        }
        io.emit("userOnline", users.filter(user => user.online));
    });
    const getUser = (userId) => users.find(user => user.userId === userId);
    io.on("connection", (socket) => {
        console.log('user connected');
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            console.log('senddddddddd', senderId, receiverId, text);
            const user = getUser(receiverId);
            console.log(user);
            if (user) {
                io.to(user.socketId).emit("getMessage", { senderId, text });
            }
        });
        socket.on('image', (imageData) => {
            console.log("recieved image data", imageData);
            socket.broadcast.emit("image", imageData);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
            removeUser(socket.id).catch(err => console.log('error during removal of user'));
            io.emit("userOnline", users.filter(user => user.online));
        });
    });
}
exports.default = initializeSocket;

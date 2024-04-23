"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("../route/userRoute"));
const parlourRoute_1 = __importDefault(require("../route/parlourRoute"));
const adminRoute_1 = __importDefault(require("../route/adminRoute"));
const chatRoute_1 = __importDefault(require("../route/chatRoute"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socketServer_1 = __importDefault(require("./socketServer"));
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use((0, cors_1.default)({ origin: process.env.CORS_URL, credentials: true }));
        var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        app.use("/api/parlour", parlourRoute_1.default);
        app.use("/api/user", userRoute_1.default);
        app.use("/api/chat", chatRoute_1.default);
        app.use("/api/admin", adminRoute_1.default);
        const server = http_1.default.createServer(app);
        (0, socketServer_1.default)(server);
        return server;
        //cors
        // app.use(
        //   cors({
        //     origin: "http://localhost:5000",
        //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        //     credentials: true,
        //   })
        // );
        //chat using socket io
        return app;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createServer = createServer;

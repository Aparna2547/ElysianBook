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
const node_schedule_1 = __importDefault(require("node-schedule"));
class scheduleBooking {
    constructor() {
    }
    SchedulingTask() {
        const date = new Date();
        console.log(date);
        console.log(`0 25 16 ${date.getDate()} ${date.getMonth() + 1} `);
        node_schedule_1.default.scheduleJob(`0 26 16 ${date.getDate()} ${date.getMonth() + 1} *`, () => __awaiter(this, void 0, void 0, function* () {
            console.log('node schedular testing');
        }));
    }
}
exports.default = scheduleBooking;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signToken(obj) {
    const token = jsonwebtoken_1.default.sign({
        data: Object.assign({}, obj),
    }, process.env.SECRET, { expiresIn: "10h" });
    return token;
}
exports.signToken = signToken;

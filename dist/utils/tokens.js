"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getAccessToken(id) {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
}
function getRefreshToken(id) {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "", {
        expiresIn: "60d",
    });
}
function getClientActivationToken(client_id, user_id) {
    const expiresIn = `1y`;
    const token = jsonwebtoken_1.default.sign({ client_id, user_id }, process.env.JWT_SECRET || "", {
        expiresIn,
    });
    return token;
}
const Tokens = {
    getAccessToken,
    getRefreshToken,
    getClientActivationToken,
};
exports.default = Tokens;

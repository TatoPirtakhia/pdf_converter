"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const decrypt = (password) => {
    const initVector = process.env.HASH_IV;
    const securityKey = process.env.HASH_KEY;
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", securityKey, initVector);
    let decryptedPassword = decipher.update(password, "hex", "utf-8");
    decryptedPassword += decipher.final("utf-8");
    return decryptedPassword;
};
const encrypt = (password) => {
    const initVector = process.env.HASH_IV;
    const securityKey = process.env.HASH_KEY;
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", securityKey, initVector);
    let encrypted = cipher.update(password, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
const Hash = {
    decrypt,
    encrypt,
};
exports.default = Hash;

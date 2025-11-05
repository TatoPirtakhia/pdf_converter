"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = deleteImage;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function deleteImage(file_name) {
    if (!file_name)
        return;
    const filePath = path_1.default.join("public/images/", file_name);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        }
    });
}

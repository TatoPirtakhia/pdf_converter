"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const images_manip_1 = require("./images_manip");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
function validateSchema(res, schema, data) {
    const { error } = schema().validate(data);
    if (error) {
        sendError(res, error.details[0].message, 422);
        return false;
    }
    return true;
}
function getCryptoHash(data) {
    return crypto_1.default.createHash("sha256").update(data, "utf8").digest("hex");
}
function sendError(res, message, status = 400) {
    if (res.locals.db) {
        res.locals.db.rollback();
        res.locals.db.release();
    }
    res.status(status).json({ message: message });
}
function sendSuccess(res, data, status = 200) {
    if (res.locals.db) {
        res.locals.db.commit();
        res.locals.db.release();
    }
    const resp = typeof data === "string" ? { message: data } : data;
    res.status(status).json(resp);
}
function sendRedirect(res, url) {
    if (res.locals.db) {
        res.locals.db.rollback();
        res.locals.db.release();
    }
    res.redirect(url);
}
function getPublicPath() {
    if (process.env.NODE_ENV === "production") {
        return path_1.default.join(__dirname, "..", "public");
    }
    else {
        return path_1.default.join(__dirname, "..", "..", "public");
    }
}
function getRootFolder() {
    if (process.env.NODE_ENV === "production") {
        return path_1.default.join(__dirname, "..");
    }
    else {
        return path_1.default.join(__dirname, "..", "..");
    }
}
function saveImageFromBase64(folder_name, image) {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${(0, uuid_1.v4)()}.png`;
    const folderPath = path_1.default.join(Utils.getPublicPath(), "images", folder_name);
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath);
    }
    fs_1.default.writeFileSync(path_1.default.join(folderPath, fileName), buffer, { encoding: 'base64' });
    return fileName;
}
function removeImage(folder_name, image) {
    const filePath = path_1.default.join(Utils.getPublicPath(), "images", folder_name, image);
    if (fs_1.default.existsSync(filePath)) {
        try {
            fs_1.default.unlinkSync(filePath);
        }
        catch (error) {
            console.log(error);
        }
    }
}
const Utils = {
    sendSuccess,
    sendError,
    sendRedirect,
    validateSchema,
    getCryptoHash,
    deleteImage: images_manip_1.deleteImage,
    getPublicPath,
    getRootFolder,
    saveImageFromBase64,
    removeImage
};
exports.default = Utils;

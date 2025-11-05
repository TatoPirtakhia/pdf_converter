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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_routes_1 = __importDefault(require("./routes/api_routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '90mb' }));
app.use("/api/pdf/v1", api_routes_1.default);
app.get("*", (req, res) => {
    var _a;
    (_a = res.locals.db) === null || _a === void 0 ? void 0 : _a.release();
    res.sendFile(__dirname + "/public/index.html");
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
}
main();

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
exports.generatePdf = void 0;
const services_1 = require("../services");
const generatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { htmlContent } = req.body;
        console.log('i am here');
        if (!htmlContent)
            return res.status(400).json({ message: "HTML content is required" });
        const pdfBuffer = yield (0, services_1.generatePdfBuffer)(htmlContent);
        // Send PDF directly in response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("responseType", "arraybuffer");
        res.setHeader("Content-Disposition", `attachment; filename="document.pdf"`);
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate PDF", error });
    }
});
exports.generatePdf = generatePdf;

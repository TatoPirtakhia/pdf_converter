import { Request, Response } from "express";
import { generatePdfBuffer } from "../services";

export const generatePdf = async (req: Request, res: Response) => {
  try {
    const { htmlContent } = req.body;
    console.log('i am here')
    if (!htmlContent) return res.status(400).json({ message: "HTML content is required" });

    const pdfBuffer = await generatePdfBuffer(htmlContent);

    // Send PDF directly in response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("responseType", "arraybuffer");
    res.setHeader("Content-Disposition", `attachment; filename="document.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate PDF", error });
  }
};

import html_to_pdf from "html-pdf-node"

export const generatePdfBuffer = async (html: string) => {
  const file = { content: html }
  const pdfBuffer = await html_to_pdf.generatePdf(file, {
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
  })
  return pdfBuffer
}

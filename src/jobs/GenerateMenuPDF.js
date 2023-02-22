import { PdfService } from "../services";
import Queue from "../utils/queue";

export default {
  key: "GenerateMenuPDF",
  options: {},
  async handle({ data }) {
    const { pdfBuffer } = await PdfService.generateMenuPDF(
      data.menuEjsData,
      data.HtmlToPdfOptions
    );

    // Send email with URL to uploaded PDF after job finishes
    const { emailNotification } = data;
    if (emailNotification) {
      Queue.add("SendEmailWithPdfUrl", {
        recipent: emailNotification.recipent,
        pdfBuffer,
      });
    }
  },
};

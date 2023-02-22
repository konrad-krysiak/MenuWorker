import { MailService } from "../services";
import winstonLogger from "../utils/logger";

export default {
  key: "SendEmailWithPdfUrl",
  options: {},
  async handle({ data }) {
    const attachments = [
      {
        filename: "menu.pdf",
        content: Buffer.from(data.pdfBuffer.data),
      },
    ];
    await MailService.sendEmail(
      data.recipent,
      "Your PDF link from MenuWorker!",
      "PDF has been generated. <br />" + data.uploadURL,
      attachments
    );
    winstonLogger.info(`Email to ${data.recipent} has been sent.`);
  },
};

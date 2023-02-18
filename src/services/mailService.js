import "../bootstrap";
import nodemailer from "nodemailer";
import winstonLogger from "../utils/logger";

class MailService {
  #transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MWEMAIL,
      pass: process.env.MWPASSWORD,
    },
  });

  async sendEmail(recipient, subject, html) {
    try {
      const response = await this.#transporter.sendMail({
        from: process.env.MWEMAIL,
        to: recipient,
        subject,
        html,
      });
      return response.messageId;
    } catch (e) {
      winstonLogger.error(
        "Mail could not be sent. Following error happened: " + e.message
      );
      return false;
    }
  }
}

export default new MailService();

import "../bootstrap";

import ejs from "ejs";
import html_to_pdf from "html-pdf-node";
import { resolve } from "path";

import winstonLogger from "../utils/logger";
import { uploadPdf } from "../helpers/fileUpload";
import db from "../models";

const { Menu } = db;

class PdfService {
  #menuTemplateURL = resolve(process.env.MENU_TEMPLATE_URL);

  generateMenuPDF(menuEjsData, HtmlToPdfOptions = {}) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        this.#menuTemplateURL,
        { menu: menuEjsData },
        async (error, dataString) => {
          if (error) {
            winstonLogger.error("Error while generating pdf", error);
            reject({
              message: "Error while generating pdf",
              error,
            });
          } else {
            const pdfBuffer = await html_to_pdf.generatePdf(
              { content: dataString },
              HtmlToPdfOptions
            );
            winstonLogger.info("Menu PDF has been generated. ");

            // Upload PDF to google storage
            const uploadURL = await uploadPdf(
              pdfBuffer,
              `pdf-${menuEjsData.id}.pdf`
            );
            winstonLogger.info("Menu PDF has been UPLOADED. " + uploadURL);

            // Update Menu's pdf property
            await Menu.update(
              { pdf: uploadURL },
              { where: { id: menuEjsData.id } }
            );
            winstonLogger.info("Menu has been updated in database.");

            resolve({ uploadURL });
          }
        }
      );
    });
  }
}

export default new PdfService();

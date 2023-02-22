import "../bootstrap";

import ejs from "ejs";
import html_to_pdf from "html-pdf-node";
import { resolve } from "path";

import winstonLogger from "../utils/logger";

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
            resolve({ pdfBuffer });
          }
        }
      );
    });
  }
}

export default new PdfService();

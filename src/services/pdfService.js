import ejs from "ejs";
import html_to_pdf from "html-pdf-node";
import { resolve } from "path";
import fs from "fs";

import winstonLogger from "../utils/logger";

class PdfService {
  #menuTemplateURL = resolve(process.env.MENU_TEMPLATE_URL);
  #bootstrapUrl = resolve(process.env.BOOTSTRAP_CSS_URL);

  generateMenuPDF(menuEjsData, HtmlToPdfOptions = {}) {
    const bootstrapFile = fs.readFileSync(this.#bootstrapUrl, "utf8");
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        this.#menuTemplateURL,
        { menu: menuEjsData, css: bootstrapFile },
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

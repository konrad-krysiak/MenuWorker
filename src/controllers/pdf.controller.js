import db from "../models";
import queue from "../utils/queue";
import fs from "fs";

const { Restaurant, Menu, Category, Product } = db;

class PdfController {
  menuPreview = async (req, res, next) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId },
        include: [
          { model: Restaurant },
          { model: Category, include: { model: Product } },
        ],
      });
      const bootstrapFile = fs.readFileSync(
        process.env.BOOTSTRAP_CSS_URL,
        "utf8"
      );
      res.render("pdf/menuPDF", { menu, css: bootstrapFile, layout: false });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  menuGenerate = async (req, res, next) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId },
        include: [
          { model: Restaurant },
          { model: Category, include: { model: Product } },
        ],
      });

      queue.add("GenerateMenuPDF", {
        menuEjsData: menu,
        HtmlToPdfOptions: {},
        emailNotification: { recipent: req.user.email },
      });

      res.render("pdf/menuPDFConfirmation", {
        layout: "layouts/dashboard",
        recipentEmailAddress: req.user.email,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new PdfController();

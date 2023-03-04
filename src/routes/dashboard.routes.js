import express from "express";

import RestaurantController from "../controllers/restaurant.controller";
import MenuController from "../controllers/menu.controller";
import CategoryController from "../controllers/category.controller";
import ProductController from "../controllers/product.controller";
import ApplicationController from "../controllers/application.controller";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/restaurants", RestaurantController.indexView);
router.get("/restaurants/new", RestaurantController.newView);
router.get("/restaurants/:id", RestaurantController.showView);
router.get("/restaurants/:id/edit", RestaurantController.editView);
router.post("/restaurants/new", RestaurantController.create);
router.put("/restaurants/:id", RestaurantController.edit);
router.delete("/restaurants/:id", RestaurantController.delete);

router.get("/menus", MenuController.indexView);
router.get("/menus/new", MenuController.newView);
router.get("/menus/:id/edit", MenuController.editView);
router.post("/menus/new", MenuController.create);
router.put("/menus/:id", MenuController.update);
router.delete("/menus/:id", MenuController.delete);
router.get("/menus/:id/pdf/preview", MenuController.pdfPreview);
router.get("/menus/:id/pdf/generate", MenuController.generatePdf);

router.post("/categories/new", CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

router.post("/products/new", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

router.get("/qr", ApplicationController.indexQR);
router.get("/qr/:id", ApplicationController.showQR);

router.get("/settings", ApplicationController.settings);
router.post("/settings/changepassword", UserController.changePassword);

export default router;

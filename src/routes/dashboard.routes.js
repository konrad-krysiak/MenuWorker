import express from "express";

import RestaurantController from "../controllers/restaurant.controller";
import MenuController from "../controllers/menu.controller";
import CategoryController from "../controllers/category.controller";
import ProductController from "../controllers/product.controller";

import { uploadImage } from "../helpers/fileUploadHelper";

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

router.post("/categories/new", CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

router.post("/products/new", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

router.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

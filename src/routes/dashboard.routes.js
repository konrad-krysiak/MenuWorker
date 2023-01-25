import express from "express";

import RestaurantController from "../controllers/restaurant.controller";
import MenuController from "../controllers/menu.controller";

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
router.get("/menus/:id", MenuController.showView);
router.get("/menus/:id/edit", MenuController.editView);

router.post("/menus/new", MenuController.create);
router.delete("/menus/:id", MenuController.delete);

export default router;

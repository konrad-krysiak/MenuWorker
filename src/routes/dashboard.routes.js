import express from "express";

import RestaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/restaurants", RestaurantController.indexView);
router.get("/restaurants/new", RestaurantController.newView);
router.get("/restaurants/:id", RestaurantController.showView);
router.get("/restaurants/:id/edit", RestaurantController.editView);

router.post("/restaurants/new", RestaurantController.create);
router.put("/restaurants/:id", RestaurantController.edit);
router.delete("/restaurants/:id", RestaurantController.delete);

export default router;
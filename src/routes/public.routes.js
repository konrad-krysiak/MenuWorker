import express from "express";

import ApplicationController from "../controllers/application.controller";

const router = express.Router();

router.get("/menu/:id", ApplicationController.showMenuPublic);
router.get("/restaurant/:id", ApplicationController.showRestaurantPublic);

export default router;

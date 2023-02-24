import express from "express";

import ApplicationController from "../controllers/application.controller";

const router = express.Router();

router.get("/menu/:id", ApplicationController.showMenuPublic);

export default router;

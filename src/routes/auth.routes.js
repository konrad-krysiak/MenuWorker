import express from "express";

import ApplicationController from "../controllers/application.controller";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/login", ApplicationController.login);
router.get("/register", ApplicationController.register);

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/register", UserController.create);

export default router;

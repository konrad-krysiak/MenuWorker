import ApplicationController from "../controllers/application.controller";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import publicRoutes from "./public.routes";

const routes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/public", publicRoutes);
  app.get("/", ApplicationController.index);
};

export default routes;

import { checkAuthentication } from "../utils/auth";

import ApplicationController from "../controllers/application.controller";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";

const routes = (app) => {
  // // Pass req.originalUrl to EJS templates as locals.originalUrl
  // // for 'active' menu class purposes
  // passOriginalUrlToTemplate(app);

  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
  // app.use("/dashboard", checkAuthentication, dashboardRoutes);

  app.get("/", ApplicationController.index);
};

export default routes;

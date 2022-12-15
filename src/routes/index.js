import { checkAuthentication } from '../utils/auth';
import { passOriginalUrlToTemplate } from '../utils/passDataToEjs';

import MainController from '../controllers/main.controller';
import UserController from '../controllers/user.controller';
import dashboardRoutes from './protected/dashboardRoutes';

const routes = (app) => {
  // Pass req.originalUrl to EJS templates as locals.originalUrl
  // for 'active' menu class purposes
  passOriginalUrlToTemplate(app);
  app.get('/login', MainController.loginIndex);
  app.post('/login', MainController.login);
  app.post('/logout', MainController.logout);
  app.get('/register', MainController.registerIndex);
  app.post('/register', UserController.create);
  app.use((req, res, next) => {
    console.log('--------------' + JSON.stringify(req.user));
    next();
  });
  // protected routes
  app.use('/dashboard', checkAuthentication, dashboardRoutes);

  app.get('/', MainController.index);
};

export default routes;

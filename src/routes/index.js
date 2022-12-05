import userRoutes from './user';
import loginRoute from './login';
import registerRoute from './register';


const routes = (app) => {
  app.use('/login', loginRoute);
  app.use('/users', userRoutes);
  app.use('/register', registerRoute);
  // app.use('/restaurants', restaurantsRoutes);

  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('dashboard');
    } else {
      res.render('index');
    }
  });
};

export default routes;

import passport from 'passport';

class MainController {
  // GET
  index = (req, res) => {
    res.render('index');
  };

  // GET
  loginIndex = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard/home');
      return;
    }
    res.render('login');
  };

  // POST
  login = passport.authenticate('local', {
    successRedirect: '/dashboard/home',
    failureRedirect: '/dashboard/login',
    failureFlash: true,
  });

  // POST
  logout = (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };

  // GET
  registerIndex = (req, res) => {
    res.render('register');
  };
}

export default new MainController();

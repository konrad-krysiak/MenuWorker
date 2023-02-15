class ApplicationController {
  // GET
  index = (req, res) => {
    res.render("index", {
      layout: false,
    });
  };

  // GET
  login = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard/restaurants");
      return;
    }
    res.render("auth/login", { layout: false });
  };

  // GET
  register = (req, res) => {
    res.render("auth/register", { layout: false });
  };
}

export default new ApplicationController();

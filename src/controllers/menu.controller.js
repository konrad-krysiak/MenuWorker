class MenuController {
  // GET
  index = (req, res) => {
    res.render("menus/menus_index", { layout: "layouts/dashboard" });
  };
}

export default new MenuController();

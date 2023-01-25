import db from "../models";

const { Restaurant, Menu } = db;

class MenuController {
  // GET
  indexView = async (req, res) => {
    try {
      const restaurantsWithMenus = await Restaurant.findAll({
        where: { userId: req.user.id },
        include: { model: Menu, required: true },
      });
      console.log(restaurantsWithMenus);
      res.render("menus/menus_index", {
        layout: "layouts/dashboard",
        restaurantsWithMenus,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      //
    }
  };

  newView = async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.render("menus/menus_new", {
        layout: "layouts/dashboard",
        restaurants: restaurants.map((i) => ({
          name: i.dataValues.name,
          uuid: i.dataValues.uuid,
        })),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      //
    }
  };

  editView = async (req, res) => {
    try {
      const id = req.params.id;
      const menu = await Menu.findOne({ where: { id } });
      res.render("menus/menus_edit", { layout: "layouts/dashboard", menu });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      //
    }
  };

  // SHOW VIEW COULD BE ELEGANT PDF PREVIEW
  showView = async (req, res) => {
    try {
      const id = req.params.id;
      const menu = await Menu.findOne({ where: { id } });
      res.render("menus/menus_show", { layout: "layouts/dashboard", menu });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      //
    }
  };

  create = async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: { uuid: req.body.restaurantUuid },
      });
      const menu = await restaurant.createMenu({ name: req.body.name });
      res.render("menus/menus_edit", { layout: "layouts/dashboard", menu });
    } catch (e) {
      console.log(e);
      //
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      await Menu.destroy({ where: { id } });
      res.redirect("back");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      //
    }
  };
}

export default new MenuController();

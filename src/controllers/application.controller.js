import db from "../models";

const { Menu, Restaurant, Category, Product } = db;

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

  showMenuPublic = async (req, res, next) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId },
        include: [
          { model: Restaurant },
          { model: Category, include: { model: Product } },
        ],
      });

      res.render("pdf/menuPDF", { menu });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  showRestaurantPublic = async (req, res, next) => {
    try {
      const restaurantId = req.params.id;
      const restaurant = await Restaurant.findOne({
        where: { id: restaurantId },
      });

      if (restaurant.public) {
        res.render("restaurants/restaurants_show_public", {
          restaurant,
        });
      } else {
        res.render("error");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new ApplicationController();

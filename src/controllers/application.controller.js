import QRCode from "qrcode";

import db from "../models";

const { Menu, Restaurant, Category, Product, Sequelize } = db;

class ApplicationController {
  // GET
  index = (req, res) => {
    res.render("index", {
      layout: false,
      authenticated: req.user instanceof Object,
    });
  };

  // GET
  login = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard/restaurants");
      return;
    }
    res.render("auth/login");
  };

  // GET
  register = (req, res) => {
    res.render("auth/register");
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

      if (menu.public) {
        res.render("pdf/menuPDF", { menu });
      } else {
        throw new Error("User can not access non-public menu.");
      }
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
        throw new Error("User can not access non-public restaurant.");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new ApplicationController();

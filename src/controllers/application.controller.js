import QRCode from "qrcode";

import db from "../models";

const { Menu, Restaurant, Category, Product } = db;

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

  indexQR = async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        where: { userId: req.user.id },
        raw: true,
      });
      const restaurantsWithURI = restaurants.map((i) => ({
        ...i,
        publicUrl: `${process.env.DOMAIN}/public/restaurant/${i.id}`,
      }));
      res.render("qr/qr_index", {
        layout: "layouts/dashboard",
        restaurantsWithURI,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  showQR = async (req, res, next) => {
    try {
      const restaurantId = req.params.id;
      const restaurant = await Restaurant.findOne({
        where: { id: restaurantId },
      });
      if (restaurant) {
        const qrcode = await QRCode.toDataURL(
          `https://${process.env.DOMAIN}/public/restaurant/${restaurantId}`
        );
        res.render("qr/qr_show", {
          layout: "layouts/dashboard",
          qrcode,
        });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  settings = async (req, res, next) => {
    try {
      res.render("settings/settings_index", { layout: "layouts/dashboard" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new ApplicationController();

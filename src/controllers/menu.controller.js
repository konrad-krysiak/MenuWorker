import { StatusCodes } from "http-status-codes";

import db from "../models";

const { Restaurant, Menu, Category, Product } = db;

class MenuController {
  // GET
  indexView = async (req, res, next) => {
    try {
      const restaurantsWithMenus = await Restaurant.findAll({
        where: { userId: req.user.id },
        include: { model: Menu },
      });
      res.render("menus/menus_index", {
        layout: "layouts/dashboard",
        restaurantsWithMenus,
      });
    } catch (e) {
      next(e);
    }
  };

  // GET
  newView = async (req, res, next) => {
    try {
      // Menu for restaurant with following id
      const restaurantId = req.query.restaurantId;

      // Check if user is owning restaurant with id he provided as query parameter
      const restaurant = await Restaurant.findOne({
        where: { id: restaurantId, userId: req.user.id },
      });

      if (restaurant) {
        res.render("menus/menus_new", {
          layout: "layouts/dashboard",
          restaurant,
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).render("error");
      }
    } catch (e) {
      next(e);
    }
  };

  editView = async (req, res, next) => {
    try {
      const menu = await Menu.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: {
          model: Category,
          include: {
            model: Product,
          },
        },
      });
      res.render("menus/menus_edit", {
        layout: "layouts/dashboard",
        menu,
      });
    } catch (e) {
      next(e);
    }
  };

  // POST
  // name - menu name
  // restaurantId - id of restaurant menu belongs to
  create = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: { id: req.body.restaurantId, userId: req.user.id },
      });
      await restaurant.createMenu({ name: req.body.name, userId: req.user.id });
      req.flash("info", "Menu created successfully.");
      res.redirect("/dashboard/menus");
    } catch (e) {
      if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
        req.flash(
          "error",
          e.errors.map((i) => i.message)
        );
        const restaurant = await Restaurant.findOne({
          where: { id: req.body.restaurantId, userId: req.user.id },
        });
        res.status(StatusCodes.BAD_REQUEST).render("menus/menus_new", {
          layout: "layouts/dashboard",
          restaurant,
          form: req.body,
        });
      }
      next(e);
    }
  };

  // update = async (req, res, next) => {};

  // DELETE
  delete = async (req, res, next) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId, userId: req.user.id },
      });

      await menu.destroy();
      req.flash("info", "Menu deleted successfully.");
      res.redirect("/dashboard/menus");
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new MenuController();

import { StatusCodes } from "http-status-codes";
import db from "../models";

const { Restaurant, Menu } = db;

class MenuController {
  // GET
  indexView = async (req, res) => {
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
      console.log(e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("error");
    }
  };

  // GET
  newView = async (req, res) => {
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
      console.log(e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("error");
    }
  };

  // POST
  create = async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: { id: req.body.restaurantId, userId: req.user.id },
      });
      await restaurant.createMenu({ name: req.body.name });
      req.flash("info", "Menu created successfully.");
      res.redirect("/dashboard/menus");
    } catch (e) {
      if (
        e.name === "SequelizeValidationError" ||
        e.name === "SequelizeUniqueConstraintError"
      ) {
        req.flash(
          "error",
          e.errors.map((i) => i.message)
        );
        res
          .status(StatusCodes.BAD_REQUEST)
          .redirect(
            "/dashboard/menus/new?restaurantId=" + req.body.restaurantId
          );
      } else {
        req.flash("error", "Something went wrong...");
        res.status(StatusCodes.BAD_REQUEST).redirect("/dashboard/menus");
      }
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId },
        include: {
          model: Restaurant,
        },
      });

      // We are checking if user is owner of menu
      if (menu.Restaurant.userId === req.user.id) {
        await menu.destroy();
        req.flash("info", "Menu deleted successfully.");
        res.redirect("/dashboard/menus");
      } else {
        req.flash("error", "Could not delete menu.");
        res.redirect("/dashboard/menus");
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/dashboard/menus");
    }
  };
}

export default new MenuController();

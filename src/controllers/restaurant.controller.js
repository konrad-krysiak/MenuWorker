import { StatusCodes } from "http-status-codes";
import db from "../models/index";

const { User, Restaurant } = db;

class RestaurantController {
  // GET
  indexView = async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({
        where: { userId: req.user.id },
      });
      res.render("restaurants/restaurants_index", {
        layout: "layouts/dashboard",
        restaurants: restaurants,
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("error");
    }
  };

  // GET
  newView = (req, res) => {
    res.render("restaurants/restaurants_new", { layout: "layouts/dashboard" });
  };

  editView = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      const restaurant = await Restaurant.findOne({
        where: { id: restaurantId },
      });
      res.render("restaurants/restaurants_edit", {
        layout: "layouts/dashboard",
        restaurant,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // GET
  showView = async (req, res) => {
    try {
      const id = req.params.id;
      const restaurant = await Restaurant.findOne({
        where: { id, userId: req.user.id },
      });
      if (!restaurant) {
        throw new Error("Could not find restaurant");
      }
      res.render("restaurants/restaurants_show", {
        layout: "layouts/dashboard",
        restaurant,
      });
    } catch (e) {
      req.flash("error", e.message);
      res.status(StatusCodes.BAD_REQUEST).redirect("/dashboard/restaurants");
    }
  };

  // POST
  create = async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        phone: req.body.phone,
      };
      const owner = await User.findOne({ where: { id: req.user.id } });
      await owner.createRestaurant(payload);
      req.flash("info", "Restaurant created successfully.");
      res.redirect("/dashboard/restaurants");
    } catch (e) {
      if (
        e.name === "SequelizeValidationError" ||
        e.name === "SequelizeUniqueConstraintError"
      ) {
        req.flash("error", e.errors.map((i) => i.message).join(", "));
        res
          .status(StatusCodes.BAD_REQUEST)
          .render("restaurants/restaurants_new", {
            layout: "layouts/dashboard",
          });
      } else {
        req.flash("error", "Something went wrong...");
        res.status(StatusCodes.BAD_REQUEST).redirect("/dashboard/restaurants");
      }
    }
  };

  // PUT
  edit = async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        phone: req.body.phone,
      };
      await Restaurant.update(payload, {
        where: { id: req.params.id, userId: req.user.id },
      });
      req.flash("info", "Restaurant updated successfully");
      res.redirect("/dashboard/restaurants");
    } catch (e) {
      if (
        e.name === "SequelizeValidationError" ||
        e.name === "SequelizeUniqueConstraintError"
      ) {
        req.flash("error", e.errors.map((i) => i.message).join(", "));
        res
          .status(StatusCodes.BAD_REQUEST)
          .redirect("/dashboard/restaurants/" + req.params.id + "/edit");
      } else {
        req.flash("error", "Something went wrong...");
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .redirect("/dashboard/restaurants");
      }
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      console.log("PARAMS", req.params);
      await Restaurant.destroy({
        where: { id: req.params.id, userId: req.user.id },
      });
      req.flash("info", "Restaurant deleted successfully.");
      res.redirect("/dashboard/restaurants");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/dashboard/restaurants");
    }
  };
}

export default new RestaurantController();

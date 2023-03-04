import db from "../models/index";

const { User, Restaurant, Menu } = db;

class RestaurantController {
  indexView = async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({
        where: { userId: req.user.id },
        include: {
          model: Menu,
        },
      });
      res.render("restaurants/restaurants_index", {
        layout: "layouts/dashboard",
        restaurants: restaurants,
      });
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  };

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

  showView = async (req, res) => {
    try {
      const id = req.params.id;
      const restaurant = await Restaurant.findOne({
        where: { id, userId: req.user.id },
        include: {
          model: Menu,
        },
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
      res.redirect("/dashboard/restaurants");
    }
  };

  /**
   * @param name
   * @param address
   * @param description
   * @param phone
   * @param website optional
   */
  create = async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        phone: req.body.phone,
        ...(req.body.website && { website: req.body.website }),
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
        req.flash(
          "error",
          e.errors.map((i) => i.message)
        );
        res.render("restaurants/restaurants_new", {
          layout: "layouts/dashboard",
        });
      } else {
        req.flash("error", "Something went wrong...");
        res.redirect("/dashboard/restaurants");
      }
    }
  };

  /**
   * @param name
   * @param address
   * @param description
   * @param phone
   * @param website optional
   * @param public checkbox optional
   */
  edit = async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        phone: req.body.phone,
        public: Boolean(req.body.public),
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
        res.redirect("/dashboard/restaurants/" + req.params.id + "/edit");
      } else {
        req.flash("error", "Something went wrong...");
        res.redirect("/dashboard/restaurants");
      }
    }
  };

  delete = async (req, res) => {
    try {
      console.log("PARAMS", req.params);
      const deleted = await Restaurant.destroy({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (deleted) {
        req.flash("info", "Restaurant deleted successfully.");
        res.redirect("/dashboard/restaurants");
      } else {
        req.flash("error", "Could not delete restaurant.");
        res.redirect("/dashboard/restaurants");
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/dashboard/restaurants");
    }
  };
}

export default new RestaurantController();

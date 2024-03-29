import db from "../models";

const { Restaurant, Menu, Category, Product } = db;

class MenuController {
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

  /**
   * @param restaurantId QUERY
   */
  newView = async (req, res, next) => {
    try {
      const restaurantId = req.query.restaurantId;
      const restaurant = await Restaurant.findOne({
        where: { id: restaurantId, userId: req.user.id },
      });

      if (restaurant) {
        res.render("menus/menus_new", {
          layout: "layouts/dashboard",
          restaurant,
        });
      } else {
        console.log("User does not have access to this page.");
        throw new Error("User does not have access to this page.");
      }
    } catch (e) {
      next(e);
    }
  };

  /**
   * @param id QUERY
   */
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

      let domain;
      if (process.env.NODE_ENV === "production") {
        domain = process.env.DOMAIN;
      } else {
        domain = process.env.DEV_DOMAIN;
      }

      res.render("menus/menus_edit", {
        layout: "layouts/dashboard",
        menu,
        domain,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * @param name
   * @param restaurantId hidden
   */
  create = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: { id: req.body.restaurantId, userId: req.user.id },
      });
      await restaurant.createMenu({
        name: req.body.name,
        userId: req.user.id,
        itemCount: 0,
      });
      req.flash("success", "Menu created successfully.");
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
        const restaurant = await Restaurant.findOne({
          where: { id: req.body.restaurantId, userId: req.user.id },
        });
        res.render("menus/menus_new", {
          layout: "layouts/dashboard",
          restaurant,
          form: req.body,
        });
      } else {
        next(e);
      }
    }
  };

  /**
   * @param name
   * @param public bool
   */
  update = async (req, res, next) => {
    try {
      const menu = await Menu.findOne({
        where: { id: req.params.id },
      });
      console.log(req.body);
      if (menu.userId === req.user.id) {
        await menu.update({
          name: req.body.name,
          public: Boolean(req.body.public),
        });
        req.flash("success", "Menu updated successfully.");
        res.redirect(`/dashboard/menus/${req.params.id}/edit`);
      } else {
        throw new Error("User does not have permission to update this menu.");
      }
    } catch (e) {
      if (
        e.name === "SequelizeValidationError" ||
        e.name === "SequelizeUniqueConstraintError"
      ) {
        req.flash(
          "error",
          e.errors.map((i) => i.message)
        );
        const menu = await Menu.findOne({
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
          include: { model: Category, include: { model: Product } },
        });
        res.render(`menus/menus_edit`, {
          layout: "layouts/dashboard",
          menu,
        });
      } else {
        next(e);
      }
    }
  };

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

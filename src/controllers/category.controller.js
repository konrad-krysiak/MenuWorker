import db from "../models";

const { Menu, Category, Product } = db;

class CategoryController {
  /**
   * POST
   * @param {*} name
   * @param {*} menuId hidden
   */
  create = async (req, res, next) => {
    try {
      const menu = await Menu.findOne({
        where: { id: req.body.menuId, userId: req.user.id },
      });
      await menu.createCategory({ name: req.body.name });
      req.flash("info", "Category created successfully");
      res.redirect(`/dashboard/menus/${menu.id}/edit`);
    } catch (e) {
      if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
        req.flash(
          "modalError",
          e.errors.map((i) => i.message)
        );
        const menu = await Menu.findOne({
          where: { id: req.body.menuId, userId: req.user.id },
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
          categoryCreateValidationError: true,
          form: req.body,
        });
      } else {
        next(e);
      }
    }
  };

  /**
   * PUT
   * @param name
   * @param menuId
   */
  update = async (req, res, next) => {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id },
        include: {
          model: Menu,
        },
      });

      // Ensure user is category owner
      if (category.Menu.userId === req.user.id) {
        await category.update({ name: req.body.name });
        req.flash("info", "Category updated successfully.");
        res.redirect(`/dashboard/menus/${category.Menu.id}/edit`);
      } else {
        throw new Error("User is not owning such category");
      }
    } catch (e) {
      if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
        req.flash(
          "modalError",
          e.errors.map((i) => i.message)
        );
        const menu = await Menu.findOne({
          where: { id: req.body.menuId, userId: req.user.id },
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
          categoryEditValidationError: true,
          categoryId: req.params.id,
          form: req.body,
        });
      } else {
        next(e);
      }
    }
  };

  delete = async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findOne({
        where: { id: categoryId },
        include: {
          model: Menu,
        },
      });

      if (category.Menu.userId === req.user.id) {
        await category.destroy();
        req.flash("info", "Category deleted successfully.");
        res.redirect(`/dashboard/menus/${category.Menu.id}/edit`);
      } else {
        throw new Error("User does not have access to delete this category.");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new CategoryController();

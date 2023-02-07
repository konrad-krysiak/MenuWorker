import db from "../models";

const { Restaurant, Menu, Category, Product } = db;

class ProductController {
  /**
   * @param name
   * @param description
   * @param price
   * @param menuId hidden
   * @param categoryId hidden
   */
  create = async (req, res, next) => {
    try {
      const parentMenu = await Menu.findOne({
        where: {
          id: req.body.menuId,
        },
      });

      if (parentMenu.userId === req.user.id) {
        await Product.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          categoryId: req.body.categoryId,
        });
        req.flash("info", "Product created successfully.");
        res.redirect(`/dashboard/menus/${parentMenu.id}/edit`);
      } else {
        throw new Error("User does not have access to create product.");
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
          productCreateValidationError: true,
          form: req.body,
        });
      } else {
        next(e);
      }
    }
  };

  /**
   *
   * @param name
   * @param price
   * @param description
   * @param menuId hidden
   * @param categoryId hidden
   */

  update = async (req, res, next) => {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
        include: {
          model: Category,
          include: {
            model: Menu,
          },
        },
      });

      if (product.Category.Menu.userId === req.user.id) {
        await product.update({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        });
        req.flash("info", "Product updated successfully.");
        res.redirect(`/dashboard/menus/${product.Category.Menu.id}/edit`);
      } else {
        throw new Error("User does not have access to update product.");
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
          productEditValidationError: true,
          productId: req.params.id,
          form: req.body,
        });
      } else {
        next(e);
      }
    }
  };

  delete = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({
        where: { id: productId },
        include: {
          model: Category,
          include: {
            model: Menu,
          },
        },
      });
      const parentMenuId = product.Category.Menu.id;

      if (product.Category.Menu.userId === req.user.id) {
        await product.destroy();
        req.flash("info", "Product deleted successfully.");
        res.redirect(`/dashboard/menus/${parentMenuId}/edit`);
      } else {
        throw new Error("User does not have access to delete product");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new ProductController();

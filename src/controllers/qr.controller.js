import QRCode from "qrcode";

import db from "../models";

const { Menu, Restaurant } = db;

class QRController {
  index = async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        where: { userId: req.user.id },
        include: {
          model: Menu,
        },
      });

      const menuUrls = {};
      for (let restaurant of restaurants) {
        restaurant.Menus.forEach((menu) => {
          menuUrls[menu.id] = `${process.env.DOMAIN}/public/menu/${menu.id}`;
        });
      }
      res.render("qr/qr_index", {
        layout: "layouts/dashboard",
        restaurants,
        menuUrls,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  show = async (req, res, next) => {
    try {
      const menuId = req.params.id;
      const menu = await Menu.findOne({
        where: { id: menuId },
      });
      if (menu) {
        const qrcode = await QRCode.toDataURL(
          `${process.env.DOMAIN}/public/menu/${menuId}`
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
}

export default new QRController();

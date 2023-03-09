import passport from "passport";
import bcrypt from "bcrypt";
import db from "../models";

const { User } = db;

class UserController {
  // POST
  login = passport.authenticate("local", {
    successRedirect: "/dashboard/restaurants",
    failureRedirect: "/auth/login",
    failureFlash: true,
  });

  // POST
  logout = (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  };

  // POST
  create = async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      };
      let hashedPassword = await bcrypt.hash(data.password, 10);
      await User.create({ ...data, password: hashedPassword });
      req.flash("success", "User created successfully.");
      res.redirect("/");
    } catch (e) {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          e.name
        )
      ) {
        req.flash(
          "error",
          e.errors.map((i) => i.message)
        );
        res.render("auth/register");
      } else {
        console.log("ERROR IN USER CONTROLLER: ", e);
        req.flash("error", "Something went wrong...");
        res.render("index");
      }
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const payload = {
        password: req.body.password,
        repeatpassword: req.body.repeatpassword,
      };
      if (payload.password !== payload.repeatpassword) {
        req.flash("error", "Passwords does not match.");
        res.redirect("back");
        return;
      }
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      await User.update(
        { password: hashedPassword },
        { where: { id: req.user.id } }
      );
      req.flash("success", "Password changed successfully.");
      res.redirect("back");
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}
export default new UserController();

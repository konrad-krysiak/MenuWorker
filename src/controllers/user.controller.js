import { StatusCodes } from "http-status-codes";
import passport from "passport";
import userService from "../services/userService";

class UserController {
  // POST
  login = passport.authenticate("local", {
    successRedirect: "/dashboard/restaurants",
    failureRedirect: "/dashboard/login",
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
      const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      };
      await userService.createUser(payload);
      req.flash("info", "User created successfully.");
      res.status(StatusCodes.CREATED).render("index");
    } catch (e) {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          e.name
        )
      ) {
        req.flash("error", e.errors.map((i) => i.message).join(", "));
        res.status(StatusCodes.BAD_REQUEST).render("register");
      } else {
        console.log("ERROR IN USER CONTROLLER: ", e);
        req.flash("error", "Something went wrong...");
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("index");
      }
    }
  };
}
export default new UserController();

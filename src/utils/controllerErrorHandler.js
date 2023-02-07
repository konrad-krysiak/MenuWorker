import { StatusCodes } from "http-status-codes";

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} dbErrorCallback Called on sequelize ValidationError
 */

const handleControllerError = (err, req, res, next, dbErrorCallback) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    req.flash(
      "error",
      err.errors.map((i) => i.message)
    );
    try {
      dbErrorCallback();
    } catch (e) {
      next(e);
    }
  } else {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).render("error");
  }
};

export { handleControllerError };

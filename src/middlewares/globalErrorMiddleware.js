import { StatusCodes } from "http-status-codes";

const globalErrorMiddleware = (err, req, res, next) => {
  console.log("-------------- GLOBAL ERROR OCCURRED ", err);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
};

export default globalErrorMiddleware;

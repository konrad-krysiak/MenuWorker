import { StatusCodes } from "http-status-codes";
import winstonLogger from "../utils/logger";

// eslint-disable-next-line no-unused-vars
const globalErrorMiddleware = (err, req, res, _next) => {
  winstonLogger.error("Global Error", err);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
};

export default globalErrorMiddleware;

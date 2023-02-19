import { StatusCodes } from "http-status-codes";
import winstonLogger from "../utils/logger";

const globalErrorMiddleware = (err, req, res) => {
  winstonLogger.error("Global Error", err);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
};

export default globalErrorMiddleware;

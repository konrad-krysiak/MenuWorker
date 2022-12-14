import { StatusCodes } from 'http-status-codes';

const errorFactory = {
  unAuthorized: (error) => ({
    status: StatusCodes.UNAUTHORIZED,
    message: 'User Unauthorized',
    error: error || {},
  }),
  internalServerError: (error) => ({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
    error: error || {},
  }),
  notFound: (error) => ({
    status: StatusCodes.NOT_FOUND,
    message: 'Not Found',
    error: error || {},
  }),
  conflict: (error) => ({
    status: StatusCodes.CONFLICT,
    message: 'Exist',
    error: error || {},
  }),
  badRequest: (error) => ({
    status: StatusCodes.BAD_REQUEST,
    message: 'Bad Request',
    error: error || {},
  }),
};

export default errorFactory;

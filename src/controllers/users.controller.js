import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService';
import errorFactory from '../utils/errorFactory';
import winstonLogger from '../utils/logger';

const createUser = async (req, res, next) => {
  winstonLogger.info('createUser userController');
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };
    const data = await userService.createUser(userData);
    if (data.status === StatusCodes.CREATED) {
      res.status(StatusCodes.CREATED).json(data.result);
    } else {
      next(errorFactory.conflict());
    }
  } catch (error) {
    next(error);
  }
};

export { createUser };

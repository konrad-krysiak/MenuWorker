import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService';
import errorFactory from '../utils/errorFactory';
import winstonLogger from '../utils/logger';

class UserController {
  create = async (req, res, next) => {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
      };
      const data = await userService.createUser(userData);
      switch (data.status) {
        case StatusCodes.CREATED:
          req.flash('info', 'User created successfully.');
          res.status(StatusCodes.CREATED).render('index');
          break;
        case StatusCodes.BAD_REQUEST:
          req.flash('error', data.error);
          res.status(StatusCodes.BAD_REQUEST).render('register');
          break;
        default:
          next(errorFactory.conflict());
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new UserController();

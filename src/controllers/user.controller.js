import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService';
import errorFactory from '../utils/errorFactory';
import winstonLogger from '../utils/logger';
import { dataValidator } from '../utils/validator';

class UserController {
  createUser = async (req, res, next) => {
    winstonLogger.info('createUser userController');
    try {
      const userData = {
        name: req.body.name || '',
        email: req.body.email || '',
        phone: req.body.phone || '',
        address: req.body.address || '',
        password: req.body.password || '',
      };
      const validData = dataValidator.userData(userData);
      if (!validData) {
        return next(errorFactory.badRequest('Invalid data'));
      }
      const data = await userService.createUser(userData);
      if (data.status === StatusCodes.CREATED) {
        req.flash('User created successfully.');
        res.status(StatusCodes.CREATED).render('index');
      } else {
        next(errorFactory.conflict());
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new UserController();

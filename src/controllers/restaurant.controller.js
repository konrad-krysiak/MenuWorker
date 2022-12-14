import winstonLogger from '../utils/logger';
import errorFactory from '../utils/errorFactory';
import { dataValidator } from '../utils/validator';
import restaurantService from '../services/restaurantService';
import { StatusCodes } from 'http-status-codes';

class RestaurantController {
  index = (req, res) => {
    res.render('dashboard/restaurants', { layout: 'layouts/dashboard', title: 'restaurants' });
  };

  createRestaurant = async (req, res, next) => {
    winstonLogger.info('create restaurantController');
    if (!req.user) {
      winstonLogger.error('CANNOT CREATE RESTAURANT WHEN THERES NOT REQ.USER OBJECT');
      return next(errorFactory.unAuthorized('You have to be logged in to create a restaurant.'));
    }
    try {
      const userId = req.user.id;
      const restaurantData = {
        name: res.body.name || '',
        description: res.body.description || '',
        phone: res.body.phone || '',
      };
      const validData = dataValidator.restaurantData(restaurantData);
      if (!validData) {
        return next(errorFactory.badRequest('Invalid data'));
      }
      const data = await restaurantService.createRestaurant(restaurantData, userId);
      if (data.status === StatusCodes.CREATED) {
        req.flash('Restaurant created successfully.');
        res.status(StatusCodes.CREATED).render('dashboard/restaurants');
      } else {
        next(errorFactory.conflict('error in restaurant controller'));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new RestaurantController();

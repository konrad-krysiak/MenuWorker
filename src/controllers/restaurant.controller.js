import winstonLogger from '../utils/logger';
import errorFactory from '../utils/errorFactory';
import restaurantService from '../services/restaurantService';
import { StatusCodes } from 'http-status-codes';

class RestaurantController {
  index = async (req, res) => {
    try {
      const data = await restaurantService.getRestaurants(req.user.id);
      res.render('dashboard/restaurants', { layout: 'layouts/dashboard', title: 'restaurants', restaurants: data });
    } catch (error) {
      res.status(400).json(error);
    }


    // res.render('dashboard/restaurants', { layout: 'layouts/dashboard', title: 'restaurants' });
  };

  create = async (req, res, next) => {
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

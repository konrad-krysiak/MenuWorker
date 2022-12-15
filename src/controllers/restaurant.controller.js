import winstonLogger from '../utils/logger';
import errorFactory from '../utils/errorFactory';
import restaurantService from '../services/restaurantService';
import { StatusCodes } from 'http-status-codes';

class RestaurantController {
  index = async (req, res) => {
    try {
      const data = await restaurantService.getRestaurants(req.user.id);
      res.render('dashboard/restaurants', { layout: 'layouts/dashboard', title: 'restaurants', restaurants: data.result });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  new = (req, res) => {
    console.log('lala');
    res.render('dashboard/restaurantsnew', { layout: 'layouts/dashboard' });
  };

  create = async (req, res, next) => {
    winstonLogger.info('create restaurantController');
    try {
      const userId = 1;
      const restaurantData = {
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
      };
      const data = await restaurantService.createRestaurant(restaurantData, userId);
      switch (data.status) {
        case StatusCodes.CREATED:
          req.flash('info', 'Restaurant created successfully.');
          res.status(StatusCodes.CREATED).redirect('/dashboard/restaurants');
          break;
        case StatusCodes.BAD_REQUEST:
          req.flash('error', JSON.stringify(data.error));
          res.status(StatusCodes.BAD_REQUEST).redirect('/dashboard/restaurants');
          break;
        case StatusCodes.CONFLICT:
          req.flash('error', JSON.stringify(data.error));
          res.status(StatusCodes.CONFLICT).redirect('/dashboard/restaurants');
          break;
        default:
          next(errorFactory.internalServerError());
      }
    } catch (error) {
      console.log('ERROR CAUGHT', error);
      next(error);
    }
  };
}

export default new RestaurantController();


import { StatusCodes } from 'http-status-codes';
import winstonLogger from '../utils/logger';
import db from '../helpers/db';


const { User, Restaurant } = db;

const createRestaurant = async (restaurantData, userId) => {
  const { name, description, phone } = restaurantData;
  const payload = {};
  const user = await User.findOne({
    where: { id: userId },
  });
  if (!user) {
    payload.status = StatusCodes.UNAUTHORIZED;
    winstonLogger.error('RestaurantService: Trying to create restaurant for user whom doesnt exist.');
  } else {
    const restaurant = await Restaurant.create({
      name,
      description,
      phone,
      userId,
    });
    payload.status = StatusCodes.CREATED;
    payload.result = restaurant;
  }
  return payload;
};

const getRestaurants = async (userId) => {
  const payload = {};
  const restaurants = await Restaurant.findAll({
    where: {
      userId,
    },
  });
  payload.status = StatusCodes.OK;
  payload.result = restaurants;
  return payload;
};

export default { createRestaurant, getRestaurants };

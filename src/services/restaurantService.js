
import { StatusCodes } from 'http-status-codes';
import db from '../helpers/db';
import validator from '../validation/index';


const { Restaurant } = db;

const createRestaurant = async (restaurantData, userId) => {
  const { error } = validator.validateRestaurant(restaurantData);
  const payload = {};
  if (error) {
    payload.status = StatusCodes.BAD_REQUEST;
    payload.error = error;
    return payload;
  }
  const { name, description, phone } = restaurantData;

  const existRestaurant = await Restaurant.findOne({
    where: {
      phone,
    },
  });
  if (existRestaurant) {
    payload.status = StatusCodes.CONFLICT;
    payload.error = 'Restaurant with that phone number already exists.';
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

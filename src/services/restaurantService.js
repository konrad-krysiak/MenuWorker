import db from "../models";
const { User, Restaurant } = db;

const createRestaurant = async (restaurantData, userId) => {
  const { name, address, description, phone } = restaurantData;

  const owner = await User.findOne({ where: { id: userId } });
  let restaurant;
  if (owner) {
    restaurant = await owner.createRestaurant({
      name,
      address,
      description,
      phone,
    });
  } else {
    throw new Error("Cannot create restaurant for non-existent user.");
  }
  return restaurant;
};

const getRestaurants = async (options) => {
  const restaurants = await Restaurant.findAll(options);
  return restaurants;
};

const getRestaurantById = async (id, userId) => {
  if (userId) {
    return await Restaurant.findOne({ where: { id, userId } });
  }
  return await Restaurant.findOne({ where: { id } });
};

const editRestaurant = async (payload, options) => {
  return await Restaurant.update(payload, options);
};

const deleteRestaurant = async (options) => {
  return await Restaurant.destroy(options);
};

export default {
  createRestaurant,
  getRestaurants,
  editRestaurant,
  deleteRestaurant,
  getRestaurantById,
};

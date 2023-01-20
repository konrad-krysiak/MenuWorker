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

const getRestaurants = async (userId) => {
  const restaurants = await Restaurant.findAll({
    where: {
      userId,
    },
  });
  return restaurants;
};

const getRestaurantById = async (id, userId) => {
  if (userId) {
    return await Restaurant.findOne({ where: { id, userId } });
  }
  return await Restaurant.findOne({ where: { id } });
};

const editRestaurant = async (userId, restaurantId, payload) => {
  return await Restaurant.update(payload, {
    where: { userId, id: restaurantId },
  });
};

const deleteRestaurant = async (userId, restaurantId) => {
  return await Restaurant.destroy({ where: { userId, id: restaurantId } });
};

export default {
  createRestaurant,
  getRestaurants,
  editRestaurant,
  deleteRestaurant,
  getRestaurantById,
};

import signupSchema from './schemas/signupSchema';
import restaurantSchema from './schemas/restaurantSchema';

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const validateSignup = validator(signupSchema);
const validateRestaurant = validator(restaurantSchema);

export default {
  validateSignup,
  validateRestaurant,
};

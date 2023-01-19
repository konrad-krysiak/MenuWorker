import Joi from "joi";

const restaurantSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(50).required(),
  phone: Joi.string()
    .pattern(
      /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/m
    )
    .required(),
});

export default restaurantSchema;

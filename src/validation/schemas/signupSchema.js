import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/m
    )
    .required(),
  password: Joi.string().min(4).alphanum().required(),
  confirmPassword: Joi.ref("password"),
});

export default signupSchema;

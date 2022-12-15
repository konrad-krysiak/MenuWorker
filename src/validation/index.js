import signupSchema from './schemas/signupSchema';

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const validateSignup = validator(signupSchema);

export default {
  validateSignup,
};

import { StatusCodes } from 'http-status-codes';
import db from '../helpers/db';
import bcrypt from 'bcrypt';
import validator from '../validation/index';

const { User, operator } = db;

const createUser = async (userData) => {
  const { error } = validator.validateSignup(userData);
  const payload = {};
  if (error) {
    payload.status = StatusCodes.BAD_REQUEST;
    payload.error = error.details.map((entry) => entry.message);
    return payload;
  }
  const { name, email, phone, address, password } = userData;
  const existUser = await User.findOne({
    where: {
      [operator.or]: [
        { email },
        { phone },
      ],
    },
  });
  if (existUser) {
    payload.status = StatusCodes.CONFLICT;
    payload.error = 'User already exist.';
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = {
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    };
    const user = await User.create(userObject);
    payload.status = StatusCodes.CREATED;
    payload.result = user;
  }
  return payload;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true });
  if (user) {
    return user;
  } else {
    return false;
  }
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true });
  if (user) {
    return user;
  } else {
    return false;
  }
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
};

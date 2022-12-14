import { StatusCodes } from 'http-status-codes';
import db from '../helpers/db';
import bcrypt from 'bcrypt';

const { User, operator } = db;

const createUser = async (userData) => {
  const { name, email, phone, address, password } = userData;
  const payload = {};
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

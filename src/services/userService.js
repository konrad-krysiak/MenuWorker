import bcrypt from "bcrypt";

import db from "../models";
const { User } = db;

const createUser = async (userData) => {
  const { name, email, phone, password } = userData;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (e) {
    console.log("User did not provide password");
    // igonore, sequelize will throw an error
  }
  const userObject = {
    name,
    email,
    phone,
    password: hashedPassword,
  };
  const user = await User.create(userObject);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    raw: true,
  });
  if (user) {
    return user;
  } else {
    return false;
  }
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    raw: true,
  });
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

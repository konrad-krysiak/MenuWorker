import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
    legacyMode: true,
  },
  production: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // legacyMode: true,
  },
};

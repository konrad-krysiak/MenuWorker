import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
    legacyMode: true,
  },
  production: {
    host: process.env.REDIS_SERVICE_NAME,
    port: process.env.REDIS_PORT || 6379,
    legacyMode: true,
  },
};

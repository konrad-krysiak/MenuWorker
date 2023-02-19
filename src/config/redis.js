import "../bootstrap";

export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
  },
  production: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

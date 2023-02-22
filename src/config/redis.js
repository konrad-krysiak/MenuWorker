import "../bootstrap";

export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
  },
  production: {
    host: process.env.REDIS_SERVICE_NAME,
    port: process.env.REDIS_PORT || 6379,
  },
};

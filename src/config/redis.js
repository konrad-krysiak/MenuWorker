import "../bootstrap";

export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
  },
  production: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    tls: true,
  },
};

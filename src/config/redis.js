export default {
  development: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
    legacyMode: process.env.REDIS_LEGACY_MODE,
  },
  test: {
    host: process.env.REDIS_HOST_DEV,
    port: process.env.REDIS_PORT_DEV,
    legacyMode: process.env.REDIS_LEGACY_MODE,
  },
  production: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    legacyMode: process.env.REDIS_LEGACY_MODE,
  },
};

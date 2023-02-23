import "../bootstrap";
import redis from "redis";

import redisConfig from "../config/redis";

const env = process.env.NODE_ENV || "development";

const clientConfig = {
  socket: {
    host: redisConfig[env].host,
    port: redisConfig[env].port,
  },
  password: redisConfig[env].password,
  legacyMode: redisConfig[env].legacyMode,
};
const client = redis.createClient(clientConfig);
await client.connect();

export default client;

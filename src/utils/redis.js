import "../bootstrap";
import redis from "redis";

import redisConfig from "../config/redis";

const env = process.env.NODE_ENV || "development";

console.log("CREATING REDIS CLIENT WITH: ", redisConfig[env]);
const client = redis.createClient({
  socket: {
    host: redisConfig[env].host,
    port: redisConfig[env].port,
  },
  password: redisConfig[env].password,
  legacyMode: true,
});
await client.connect();

export default client;

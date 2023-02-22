import "../bootstrap";
import redis from "redis";

import redisConfig from "../config/redis";

const env = process.env.NODE_ENV || "development";

const client = redis.createClient(redisConfig[env]);
await client.connect();

export default client;

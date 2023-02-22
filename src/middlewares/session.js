import "../bootstrap";
import session from "express-session";
import connectRedis from "connect-redis";

import redisClient from "../utils/redis";

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30, // session max age in milliseconds
  },
});

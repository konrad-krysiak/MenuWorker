import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import modelFactory from "../utils/modelFactory";
import db from "../models/index";

const { User } = db;

// We use modelFactory.sessionUser to map user object from database to object without
// unneccessary data(like password) which will be saved in req.user.
// {id, username, email, phone}

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ where: { email } });
        console.log("User passport call: " + JSON.stringify(user));
        const lol = await bcrypt.hash("password2", 10);
        console.log(lol);

        if (!user) {
          return done(null, false, { message: "No user with that email." });
        }
        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, modelFactory.sessionUser(user));
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (userId, done) => {
    const userObject = await User.findOne({ where: { id: userId } });
    const user = modelFactory.sessionUser(userObject);
    return done(null, user);
  });
}

export default initialize;

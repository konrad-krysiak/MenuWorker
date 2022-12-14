import LocalStrategy from 'passport-local';
import userService from '../services/userService';
import bcrypt from 'bcrypt';
import modelFactory from '../utils/modelFactory';
import winstonLogger from '../utils/logger';

// We use modelFactory.sessionUser to map user object from database to object without
// unneccessary data(like password) which will be saved in req.user.
// {id, username, email, phone}

function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' },
      async (email, password, done) => {
        winstonLogger.info('CRETENTIALS PROVIDED: ' + email + ' ' + password);
        const user = await userService.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'No user with that email.' });
        }
        try {
          if (await bcrypt.compare(password, user.password)) {
            winstonLogger.info('LOGIN SUCCESS');
            return done(null, modelFactory.sessionUser(user));
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        } catch (e) {
          return done(e);
        }
      }));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (userId, done) => {
    const userObject = await userService.getUserById(userId);
    const user = modelFactory.sessionUser(userObject);
    return done(null, user);
  });
}

export default initialize;

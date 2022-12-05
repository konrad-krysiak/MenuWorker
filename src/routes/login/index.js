import express from 'express';
import passport from 'passport';
import winstonLogger from '../../utils/logger';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  winstonLogger.info('AUTHENTICATION ATTEMPT' + JSON.stringify(req.body));
  next();
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

export default router;

import express from 'express';
import passport from 'passport';
import { createUser } from '../../controllers/users.controller';

const router = express.Router();

// router.post('/register', createUser);
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true,
// }));

// router.post('/logout', (req, res, next) => {
//   req.logOut((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

export default router;

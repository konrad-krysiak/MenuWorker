import express from 'express';
import path from 'path';
import flash from 'express-flash';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import expressLayouts from 'express-ejs-layouts';
import cors from 'cors';
dotenv.config();

const configure = (app) => {
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('layout', 'layouts/layout');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));
  app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')));
  app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ origin: '*' }));
  app.use(flash());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    httpOnly: false,
    secure: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};


export default { configure };

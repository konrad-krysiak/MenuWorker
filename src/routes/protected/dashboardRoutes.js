import express from 'express';

import DashboardController from '../../controllers/dashboard.controller';
import RestaurantController from '../../controllers/restaurant.controller';
import MenusController from '../../controllers/menus.controller';

const router = express.Router();

router.get('/home', DashboardController.index);
router.get('/restaurants', RestaurantController.index);
router.get('/restaurants/new', RestaurantController.new);
router.get('/menus', MenusController.index);
router.get('/qrcode', DashboardController.QRCodeView);
router.get('/sharelink', DashboardController.ShareLinkView);
router.get('/settings', DashboardController.SettingsView);

router.post('/restaurants/new', RestaurantController.create);

// router.get('/')

export default router;

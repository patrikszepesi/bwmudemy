const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const HouseBookingCtrl = require('../controllers/bookingH');

router.post('', UserCtrl.authMiddleware, HouseBookingCtrl.createHouseBooking);

router.get('/manage', UserCtrl.authMiddleware, HouseBookingCtrl.getUserHouseBookings);

module.exports = router;

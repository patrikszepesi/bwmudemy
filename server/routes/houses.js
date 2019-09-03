const express = require('express');
const router = express.Router();
const House = require('../models/house');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');



const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('/manage',  UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  House
    .where({user})
    .populate('bookingsH')
    .exec(function(err, foundHouses) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundHouses);
  });
});

router.get('/:id/verify-user', UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  House
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundHouse) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundHouse.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Nem vagy tulajdonos!'}]});
      }

      return res.json({status: 'verified'});
    });
});
//
router.get('/:id', function (req, res) {
  const houseId = req.params.id;

  House.findById(houseId)
        .populate('user', 'username -_id')
        .populate('bookingsH', 'startAt endAt -_id')
        .exec(function(err, foundHouse) {

    if (err) {
      return res.status(422).send({errors: [{title: 'House Error!', detail: 'House not found!'}]});
    }

    return res.json(foundHouse);
  });
});

router.patch('/:id', UserCtrl.authMiddleware, function(req, res) {

  const houseData = req.body;
  const user = res.locals.user;

  House
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundHouse) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundHouse.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not an owner!'}]});
      }

      foundHouse.set(houseData);
      foundHouse.save(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.status(200).send(foundHouse);
      });
    });
});

router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  House
    .findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookingsH',
      select: 'startAtH',
      match: { startAtH: { $gt: new Date()}}
    })
    .exec(function(err, foundHouse) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (user.id !== foundHouse.user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Nem vagy tulajdonos!'}]});
    }

    if (foundHouse.bookingsH.length > 0) {
      return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!'}]});
    }

    foundHouse.remove(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'status': 'deleted'});
    });
  });
});

router.post('', UserCtrl.authMiddleware, function(req, res) {
  const { titleH, cityH, streetH, categoryH, imageH,sharedH, bedroomsH, descriptionH, monthlyRateH,username,emailH,availableH,reserveH } = req.body;
  const user = res.locals.user;

  const house = new House({titleH, cityH, streetH, categoryH, imageH,sharedH, bedroomsH, descriptionH, monthlyRateH,username,emailH,availableH,reserveH});
  house.user = user;

  House.create(house, function(err, newHouse) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.update({_id: user.id}, { $push: {houses: newHouse}}, function(){});

    return res.json(newHouse);
  });
});

router.get('', function(req, res) {
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};

  House.find(query)
      .select('-bookingsH')
      .exec(function(err, foundHouses) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (city && foundHouses.length === 0) {
      return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `nincs ilyen oktató`}]});
    }

    return res.json(foundHouses);
  });
});

module.exports = router;

const HouseBooking = require('../models/housebooking');
const House = require('../models/house');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createHouseBooking = function(req, res) {
  const { startAtH, endAtH, totalPriceH, guestsH, houseH,usrContactH,aboutH } = req.body;
  const user = res.locals.user;

  const houseBooking = new HouseBooking({ startAtH, endAtH, totalPriceH, guestsH, houseH,usrContactH,aboutH});

  House.findById(house._id)
        .populate('bookingsH')
        .populate('user')
        .exec(function(err, foundHouse) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (foundHouse.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Nem lehet foglalni a Saját házadra foglalni!'}]});
    }

    if (isValidHouseBooking(houseBooking, foundHouse)) {
      houseBooking.user = user;
      houseBooking.rental = foundHouse;
      foundHouse.bookings.push(houseBooking);

      houseBooking.save(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        foundHouse.save()
        User.update({_id: user.id}, {$push: {housebookings: housebooking}}, function(){});//mongodb documentation

        return res.json({startAtH: houseBooking.startAtH, endAtH: houseBooking.endAtH});
      });
    } else {

       return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Ez már foglalt'}]});
    }
  })
}

exports.getUserHouseBookings = function(req, res) {
  const user = res.locals.user;

    Housebooking
    .where({user})
    .populate('rental')
    .exec(function(err, foundHouseBooking) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundHouseBookings);
  });
}
function isValidHouseBooking(proposedBookingH, house) {
  let isValid = true;

  if (house.houseBookings && house.houseBookings.length > 0) {

    isValid = house.houseBookings.every(function(houseBooking) {
      const proposedStartH = moment(proposedBookingH.startAtH);
      const proposedEndH = moment(proposedBookingH.endAtH);

      const actualStartH = moment(houseBooking.startAtH);
      const actualEndH = moment(houseBooking.endAtH);

      return ((actualStartH < proposedStartH && actualEndH < proposedStartH) || (proposedEndH < actualEndH && proposedEndH < actualStartH));
    });
  }

  return isValid;
}

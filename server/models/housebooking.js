const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseBookingSchema = new Schema({

  startAtH: { type:Date, required:'Kezdés időpontja kötelező'},
  endAtH : {type:Date, required: 'Meddig infó kötelező'},
  totalPriceH: Number,
  guestsH: String,
  usrContactH:String,
  aboutH:String,
  reviewH:{type:Schema.Types.ObjectId, ref:'Review'},
  createdAtH: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  houseH: { type: Schema.Types.ObjectId, ref: 'House'}
});


module.exports = mongoose.model('HouseBooking', houseBookingSchema );

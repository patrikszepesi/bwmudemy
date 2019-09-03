const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({


  totalPrice: Number,
  days: Number,
  guests: String,
  time:String,
  usrContact:String,
  about:String,
  what:String,
  when:String,
  review:{type:Schema.Types.ObjectId, ref:'Review'},
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  rental: { type: Schema.Types.ObjectId, ref: 'Rental'}
});


module.exports = mongoose.model('Booking', bookingSchema );

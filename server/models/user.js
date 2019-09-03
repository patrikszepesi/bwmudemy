const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },

  role: { type: String },


  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email kötelező',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  houses: [{type: Schema.Types.ObjectId, ref: 'House'}],
  rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  bookingsH: [{ type: Schema.Types.ObjectId, ref: 'BookingH' }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {

  return bcrypt.compareSync(requestedPassword, this.password);
}


userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
  });
});

module.exports = mongoose.model('User', userSchema );

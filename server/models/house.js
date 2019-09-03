const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const houseSchema = new Schema({
  titleH: { type: String, required: true, max: [128, 'Túl hosszú, max 128 karakter']},
  cityH: { type: String, required: true, lowercase: true },
  streetH: { type: String, required: true, min: [4, 'Túl rövid, min 4 karakter']},
  categoryH: { type: String, required: true, lowercase: true },
  imageH: { type: String, required: false },
  bedroomsH: {type:String, required:false},
  emailH:{type:String,required:false},
  phoneH:{type:String,required:false},
  availableH:{type:String,required:false},
  sharedH: {type:String,required:true},
  reserveH:Boolean,
  descriptionH: { type: String, required: true },
  monthlyRateH: Number,
  createdAtH: { type: Date, default: Date.now },
  userH: { type: Schema.Types.ObjectId, ref: 'User' },
  bookingsH: [{ type: Schema.Types.ObjectId, ref: 'BookingH' }]
});


module.exports = mongoose.model('House', houseSchema );

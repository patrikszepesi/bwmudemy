const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ALLOWED_RATING=[1,2,3,4,5];

const reviewSchema= new Schema({
  rating:Number,
  text:String,
  createdAt:{type:Date,default:Date.now},
  rental:{type:Schema.Types.ObjectId,ref:'Rental'},
  user:{type:Schema.Types.ObjectId,ref:'User'},


});
module.exports=mongoose.model('Review',reviewSchema);

reviewSchema.pre('save',function(next){
  if(ALLOWED_RATING.indexOf(this.rating)>=0){
    next();
  }else{
    const err= new Error({értékelés:"Nem engedélyezett értékelés"});
    err.errors={};
    err.errors.rating={message:"Nem engedélyezett értékelés"}
    next(err);
  }
});

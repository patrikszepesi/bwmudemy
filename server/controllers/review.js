const User=require('../models/user');
const Rental=require('../models/rental');
const Review=require('../models/review')

const Booking=require('../models/booking');
const moment=require('moment');

const {normalizeErrors}=require('../helpers/mongoose');

exports.getReviews=function(req,res){
  const {rentalId}=req.query;

  Review.find({'rental':rentalId})
  .populate('user')
  .exec((err,reviews)=>{
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

return res.json(reviews);
  });
};

exports.createReview=function(req,res){
  const reviewData=req.body;
  const{bookingId}=req.query;
  const user=res.locals.user;

  Booking.findById(bookingId)
    .populate({path:'rental',populate:{path:'user'}})
    .populate('review')
    .populate('user')
    .exec(async(err,foundBooking)=>{
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      const{rental}=foundBooking;
      if(rental.user.id===user.id){
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Nem lehet értékelni a Saját órádat!'}]});
      }

      const foundBookingUserId=foundBooking.user.id;

      if(foundBookingUserId!==user.id){
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Nem lehet értékelni más óráját!'}]});
      }
/*WE NO LONGER HAVE ENDAT PROP
      const timeNow=moment();
      const endAt=moment(foundBooking.endAt);

      if (!endAt.isBefore(timeNow)){
        return res.status(422).send({errors: [{title: 'Invalid Date!', detail: 'csak utazas utan tudsz ertekelni!'}]});
      }
*/
if(foundBooking.review){
  return res.status(422).send({errors: [{title: 'Booking Error!', detail: 'Csak egy értékelés lehet!'}]});

}

const review=new Review(reviewData);
review.user=user;
review.rental=rental;
foundBooking.review=review;

try{
  await foundBooking.save();
  const savedReview=await review.save();

  return res.json(savedReview);
}catch (err){
    return res.status(422).send({errors: normalizeErrors(err.errors)});
}

    });

};

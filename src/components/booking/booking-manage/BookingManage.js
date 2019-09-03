import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard';
import {ReviewModal} from  'components/review/ReviewModal';

import * as actions from 'actions';

class BookingManage extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  handleReviewCreated=(review,bookingIndex)=>{
    const {dispatch}=this.props;
    const{data:bookings}=this.props.userBookings;

    //const index= bookings.findIndex((booking)=>booking._id===updatedBooking._id)
    //updatedBooking.review=review;
    bookings[bookingIndex].review=review

    dispatch(actions.updateBookings(bookings));
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => <BookingCard booking={booking} key={index} hasReview={!!booking.review} reviewModal={()=> <ReviewModal onReviewCreated={(review)=>{
    this.handleReviewCreated(review,index);
    }} bookingId={booking._id}/>} />);
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
      <section id="userBookings">
        <h1 className="page-title">Oktatóhoz foglalat Időpontjaim</h1>
        <div className="row">
        { this.renderBookings(bookings) }
        </div>
        { !isFetching && bookings.length === 0 &&
          <div className="alert alert-warning">
          Még nem foglaltál időpontot egy oktatóhoz sem
            <Link style={{'marginLeft': '10px'}} className="btn btn-bwm" to="/rentals">Oktatók Keresek</Link>
          </div>
        }
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)

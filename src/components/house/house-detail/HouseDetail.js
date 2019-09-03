import React from 'react';
import { connect } from 'react-redux';
import { HouseDetailInfo } from './HouseDetailInfo';
import HouseMap from './HouseMap';
import HouseBooking from 'components/houseBooking/houseBooking';
import StarRatings from 'react-star-ratings';
import {  pretifyDate } from 'helpers';
//
import * as actions from 'actions';

export class HouseDetail extends React.Component {

  state={
    reviewsH:[]
  }

  componentWillMount() {
    // Dispatch action
    const houseId = this.props.match.params.id;

    this.props.dispatch(actions.fetchHouseById(houseId)).then(
      (house)=>{
        this.getReviews(house._id);
      });
  }

  getReviews=(houseId)=>{
    actions.getReviews(houseId)
    .then((reviewsH)=>{
      this.setState({reviewsH});
    })
  }
  render() {
    const { house } = this.props;
    const{reviewsH}=this.state

    if (house._id) {
      return (
        <section id='houseDetails'>
          <div className='upper-section'>
            <div className='row'>
              <div className='col-md-6'>
                <img src={house.image} alt=''></img>
              </div>
              <div className='col-md-6'>
                <HouseMap location={`${house.city}, ${house.street}`} />
              </div>
            </div>
          </div>
          <div className='details-section'>
            <div className='row'>
              <div className='col-md-8'>
                <HouseDetailInfo house={house} />
              </div>
              <div className='col-md-4'>

               <HouseBooking house={house} />

              </div>

            </div>
            {reviewsH && reviewsH.length>0 &&
                            <div className="row">
                  <div className="col-md-8">
                    <section style={{marginTop: '0px'}}>

                      <h2>Értékelések</h2>

                      { reviewsH.map(review=>
                      <div key={review._id} className="card review-card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-2 user-image">
                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" alt=""/>
                                <p className="text-secondary text-center">{pretifyDate(review.createdAtH)}</p>
                            </div>

                            <div className="col-md-10">
                              <div>
                                <a><strong>{reviewsH.user.username}</strong></a>
                                <div className="review-section">
                                  <StarRatings
                                    rating={reviewsH.rating}
                                    starRatedColor="orange"
                                    starHoverColor="orange"
                                    starDimension="25px"
                                    starSpacing="2px"
                                    numberOfStars={5}
                                    name='rating'
                                  />
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <p>{reviewsH.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    )}
                    </section>
                  </div>
                </div>
                }

          </div>
        </section>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    house: state.house.data,
    errors: state.house.errors
  }
}

export default connect(mapStateToProps)(HouseDetail)

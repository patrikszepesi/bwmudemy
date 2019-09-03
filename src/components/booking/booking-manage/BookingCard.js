import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from 'helpers';

export function BookingCard(props) {

  const { booking,reviewModal,hasReview, } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
        {booking.rental ? booking.rental.name2 : 'Törölt Óra'}
        </div>
        <div className="card-block">
          { booking.rental &&
            <div>
                  <p>{toUpperCase(booking.rental.category)} </p>
              <h4 className="card-title"> {booking.rental.title} - {toUpperCase(booking.rental.city)}</h4>

              <p>Konzultáció Optimális Napja:  {booking.when}</p>
              <p>Konzultáció Optimális Ideje:  {booking.time}</p>
            </div>
          }


           { booking.rental &&
              <Link className="btn btn-bwm-cool" to={`/rentals/${booking.rental._id}`}>Menj az Oktatóhoz</Link>
           }
           {
             reviewModal && !hasReview && reviewModal()
           }
        </div>
        <div className="card-footer text-muted">
          Létrehozás dátuma {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  )
}



/*import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from 'helpers';


export function BookingCard(props) {

  //const { open, closeModal, booking, confirmModal, errors, rentalPrice,time } = props;
  const { booking,reviewModal,hasReview, } = props;
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental ? booking.rental.name2 : 'Törölt Óra'}
        </div>
        <div className="card-block">

            <div>
                    <p>Konzultáció Napja:  {booking.about}</p>
                <p>Konzultáció Napja:  {booking.when}</p>
                <p>Konzultáció Ideje:  {booking.time}</p>


            </div>


          <p className="card-text booking-price"><span>Ár: </span> <span className="booking-price-value">{booking.totalPrice} HUF</span></p>
           { booking.rental &&
              <Link className="btn btn-bwm-cool" to={`/rentals/${booking.rental._id}`}>Menj az Oktatóhoz</Link>
           }
           {
             reviewModal && !hasReview && reviewModal()
           }
        </div>
        <div className="card-footer text-muted">
          Létrehozás dátuma {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  )
}*/

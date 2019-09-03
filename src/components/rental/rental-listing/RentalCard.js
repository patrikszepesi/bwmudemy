import React from 'react';
import { Link } from 'react-router-dom';



//import { rentalType } from 'helpers';

export function RentalCard(props) {
  const rental = props.rental;

  return (
    <div className={props.colNum}>
      <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
        <div className='card bwm-card'>
          <img className='card-img-top' src={rental.image} alt={rental.title}></img>
          <div className='card-block'>
            <h6 className={`card-subtitle ${rental.category}`}> {rental.category} &#183; {rental.title} &#183;</h6>
              <h4 className='card-title'> Tantárgy: { rental.city.toUpperCase()}</h4>
                <h4 className='card-title'>{rental.name2}</h4>




            <p className='card-text'>{rental.dailyRate} HUF/óra</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

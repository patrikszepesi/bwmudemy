import React from 'react';
import { Link } from 'react-router-dom';



//import { rentalType } from 'helpers';

export function HouseCard(props) {
  const house = props.house;

  return (
    <div className={props.colNum}>
      <Link className='rental-detail-link' to={`/houses/${house._id}`}>
        <div className='card bwm-card'>
          <img className='card-img-top' src={house.image} alt={house.title}></img>
          <div className='card-block'>
            <h6 className={`card-subtitle ${house.category}`}> {house.category} &#183; {house.title} &#183;</h6>
              <h4 className='card-title'> Tantárgy: { house.city}</h4>





            <p className='card-text'>{house.dailyRate} HUF/óra</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

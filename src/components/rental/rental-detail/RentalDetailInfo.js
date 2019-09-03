import React from 'react';
//import { RentalAssets } from './RentalAssets';
import { toUpperCase, rentalType, rentalType2 } from 'helpers';

export function RentalDetailInfo(props) {
  const rental = props.rental;

  return (
      <div className='rental'>
            <h6>Csak úgy tudod Értékelni az Oktatót ha a Gyors Foglalón keresztül foglalsz időpontot</h6>
            <h8>Az Értéklések megtekintéséhez görgess az oldal aljára</h8>
              <hr/>
          <h2 className='rental-title'>{rental.name2}</h2>
          <h6 className='rental-category'>{toUpperCase(rental.city)} Oktató</h6>
 <h6 className='rental-category'>{rentalType(rental.shared)} oktat </h6>
 <h6 className='rental-category'>{rentalType2(rental.reserve)} </h6>
  <h6 className='rental-category'>{toUpperCase(rental.category)} : {rental.title}</h6>
        <div className="rental-owner">




        </div>
        <h6 className='rental-category'> Ezen a Szakon Tanul(t) : {rental.major}</h6>
          <h6 className='rental-category'> Órabér : {rental.dailyRate} Ft/óra</h6>


        <h6 className='rental-category'>Tanítás helyszíne : {toUpperCase(rental.city2)} {rental.street}</h6>
        <h1 className='rental-contact'>{rental.contact}</h1>
        <div className='rental-room-info'>

        
        </div>
        <p className='rental-description'>
          {rental.description}
        </p>
          <h1 className='rental-title'>Elérhetőségek</h1>
            <hr/>

          <li>
          <h7 className='rental-email'> Emailcím : <a href={"mailto:" + rental.email}>{rental.email}</a></h7>

          <hr/>



          </li>
              <li>
              <h7 className='rental-contact2'>Telefonszám : {rental.contact2}</h7>

              </li>
              <hr/>

                <li>
              <h7 className='rental-contact2'>Mikor ér rá : {rental.available}</h7>
                </li>
                  <hr/>
      </div>
    )
}

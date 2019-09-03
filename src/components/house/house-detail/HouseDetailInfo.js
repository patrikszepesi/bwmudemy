import React from 'react';
//import { RentalAssets } from './RentalAssets';
import { toUpperCase, rentalType, rentalType2 } from 'helpers';

export function HouseDetailInfo(props) {
  const house = props.house;

  return (
      <div className='rental'>
            <h6>Csak úgy tudod Értékelni az Oktatót ha a Gyors Foglalón keresztül foglalsz időpontot</h6>
            <h8>Az Értéklések megtekintéséhez görgess az oldal aljára</h8>
              <hr/>
          <h2 className='rental-title'>{house.name2}</h2>
          <h6 className='rental-category'>{toUpperCase(house.emailH)} Oktató</h6>
 <h6 className='rental-category'>{rentalType(house.sharedH)} oktat </h6>
 <h6 className='rental-category'>{rentalType2(house.reserveH)} </h6>
  <h6 className='rental-category'>{toUpperCase(house.categoryH)} : {house.titleH}</h6>
        <div className="rental-owner">




        </div>
        <h6 className='rental-category'> Ezen a Szakon Tanul(t) : {house.emailH}</h6>
          <h6 className='rental-category'> Órabér : {house.dailyRateH} Ft/óra</h6>


        <h6 className='rental-category'>Tanítás helyszíne : {toUpperCase(house.cityH)} {house.streetH}</h6>
        <h1 className='rental-contact'>{house.emailH}</h1>
        <div className='rental-room-info'>


        </div>
        <p className='rental-description'>
          {house.descriptionH}
        </p>
          <h1 className='rental-title'>Elérhetőségek</h1>
            <hr/>

          <li>
          <h7 className='rental-email'> Emailcím : <a href={"mailto:" + house.emailH}>{house.emailH}</a></h7>

          <hr/>



          </li>
              <li>
              <h7 className='rental-contact2'>Telefonszám : {house.contactH}</h7>

              </li>
              <hr/>

                <li>
              <h7 className='rental-contact2'>Mikor ér rá : {house.availableH}</h7>
                </li>
                  <hr/>
      </div>
    )
}

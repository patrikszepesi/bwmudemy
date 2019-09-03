
import titleize from 'titleize';
import * as moment from 'moment';

export const rentalType = isShared => isShared ? 'Csoportos Órát' : 'Egyéni Órát'

export const rentalType2 = isReserved => isReserved ? 'Használja a Gyors Foglalót' : 'Nem használja a Gyors Foglalót'


export const toUpperCase = value => value ? titleize(value) : ''

export const pretifyDate = date => moment(date).format('Y/MM/DD')

export const getRangeOfDates = (startAt,  dateFormat = 'Y/MM/DD') => {

  const tempDates = [];

  //let mStartAt = moment().startOf('hour');

  //timePicker: true
  //locale: {
      //format: 'Y/MM/DD'
  //  }





  return tempDates;
}

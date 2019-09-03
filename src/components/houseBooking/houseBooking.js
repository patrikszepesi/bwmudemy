import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-toastify';
import { HouseBookingModal } from './HouseBookingModal';
import { getRangeOfDates } from 'helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BwmTextArea } from 'components/shared/form/BwmTextArea';

import * as moment from 'moment';
import * as actions from 'actions';

class HouseBooking extends React.Component {

  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedHouseBooking: {
        startAtH: '',
        endAtH: '',
        guestsH: '',
        timeH:'',
        contactH:'',
        when:'',

      },
      modal: {
        open: false
      },
      errors: []
    }

    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveHouse = this.reserveHouse.bind(this);
  }


  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const {bookings} = this.props.house;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAtH, booking.endAtH, 'Y/MM/DD');
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  checkInvalidDates(date) {
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }

  handleApply(event, picker) {
    const startAtH = picker.startDate.format('Y/MM/DD');
    const endAtH = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = startAtH;

    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        startAtH,
        endAtH
      }
    });
  }

  handleWhen(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        when:event.target.value
      }
    })
  }

  handleGuests(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        guestsH:event.target.value
      }
    })
  }

  handleTime(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        timeh:event.target.value
      }
    })
  }
  handleusrContact(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        contact:event.target.value
      }
    })
  }

  handleAbout(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        aboutH:event.target.value
      }
    })
  }
  handleWhat(event) {
    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        whatH:event.target.value
      }
    })
  }

  cancelConfirmation() {
    this.setState({
      modal: {
        open: false
      }
    })
  }

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAtH, booking.endAtH);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    //this.dateRef.current.value = '';

    this.setState({proposedHouseBooking: {guestsH: '',timeH:'',usrContactH:'',aboutH:'',whatH:'',whenH:'',daysH:''}});
  }

  confirmProposedData() {
    const {startAtH, endAtH} = this.state.proposedHouseBooking;
    const daysH = getRangeOfDates(startAtH, endAtH).length - 1;
    const { house } = this.props;

    this.setState({
      proposedHouseBooking: {
        ...this.state.proposedHouseBooking,
        daysH,
        totalPriceH: daysH * house.dailyRateH,
        house
      },
      modal: {
        open: true
      }
    });
  }

  reserveHouse() {
    actions.createBooking(this.state.proposedHouseBooking).then(
      (booking) => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success('Sikeres Előfoglalás');
      },
      (errors) => {
        this.setState({errors});
      })
  }

  render() {
    const { house, auth: { isAuth } } = this.props;
    const { startAtH, endAtH, guestsH,timeH,usrContactH,aboutH,whatH,whenH } = this.state.proposedHouseBooking;

    return (
      <div className='booking'>
        <h3 className='booking-price'> Gyors Foglaló </h3>
          <h9 > Figyelem! Nem mindegyik Oktató használja a Gyors Foglalót </h9>
        <hr></hr>
        { !isAuth &&

          <Link className='btn btn-bwm btn-confirm btn-block ' to={{pathname: '/login'}}>
          <p>Értékelések megtekintéséhez</p>
          <p>és Foglaláshoz</p>
          <p>Kattins Ide</p>
            </Link>
        }
        { isAuth &&
          <React.Fragment>
          <div className='form-group'>
            <label htmlFor='when'>Melyik Nap mennél</label>
            <input onChange={(event) => { this.handleWhen(event)}}
                   value={whenH}
                   type='text'
                   className='form-control'
                   id='when'
                   aria-describedby='guests'
                   placeholder='pl. Január 13'>
            </input>
          </div>

            <div className='form-group'>
              <label htmlFor='guests'>Teljes Neved</label>
              <input onChange={(event) => { this.handleGuests(event)}}
                     value={guestsH}
                     type='text'
                     className='form-control'
                     id='guests'
                     aria-describedby='guests'
                     placeholder=''>
              </input>
            </div>
            <div className='form-group'>
              <label htmlFor='time'>Időpont</label>
              <input onChange={(event) => { this.handleTime(event)}}
                     value={timeH}
                     type='text'
                     className='form-control'
                     id='time'
                     //aria-describedby='guests'
                     placeholder='pl. 16:00-18:00'>
              </input>
            </div>
            <div className='form-group'>
              <label htmlFor='usrContact'>Elérhetőséged</label>
              <input onChange={(event) => { this.handleusrContact(event)}}
                     value={usrContactH}
                     type='text'
                     className='form-control'
                     id='usrContact'
                     aria-describedby='guests'
                     placeholder='Emailcímed vagy Telefonszámod'>
              </input>
            </div>

            <div className='form-group'>
              <label htmlFor='about'>Adatok az Oktatónak</label>
              <input onChange={(event) => { this.handleAbout(event)}}
              value={aboutH}
              type='text'
              className='form-control'
              id='about'
              aria-describedby='guests'
              placeholder='Hol Tanulsz, Szakod(ha van)'>

              </input>
            </div>

            <div className='form-group'>
              <label htmlFor='what'>Miből kéne Felkészülnöd</label>
              <input onChange={(event) => { this.handleWhat(event)}}
              value={whatH}
              type='text'
              className='form-control'
              id='what'
              aria-describedby='guests'
              placeholder='pl.Függvényanalízis, Integrálás, stb.'>

              </input>
            </div>
            <button disabled={ !guestsH || !timeH ||!whenH || !usrContactH || !whatH} onClick={() => this.confirmProposedData()} className='btn btn-bwm btn-confirm btn-block'>Foglalj Időpontot</button>
          </React.Fragment>
        }

        <HouseBookingModal open={this.state.modal.open}
                      closeModal={this.cancelConfirmation}
                      confirmModal={this.reserveHouse}
                      booking={this.state.proposedHouseBooking}
                      errors={this.state.errors}
                      housePriceH={house.dailyRateH}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(HouseBooking)

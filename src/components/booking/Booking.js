
import React from 'react';
//import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-toastify';
import { BookingModal } from './BookingModal';
//import { getRangeOfDates } from 'helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { BwmTextArea } from 'components/shared/form/BwmTextArea';

//import * as moment from 'moment';
import * as actions from 'actions';

class Booking extends React.Component {

  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        //startAt: '',
        //endAt: '',
        guests: '',
        time:'',
        usrContact:'',
        about:'',
        what:'',
        when:'',
      },
      modal: {
        open: false
      },
      errors: []
    }

    //this.checkInvalidDates = this.checkInvalidDates.bind(this);
    //this.handleApply = this.handleApply.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveRental = this.reserveRental.bind(this);
  }


  /*componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const {bookings} = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, /*booking.endAt, 'Y/MM/DD');
        this.bookedOutDates.push(...dateRange);
      });
    }
  }*/

  /*checkInvalidDates(date) {
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }*/

  /*handleApply(event, picker) {
    //const startAt = picker.startDate.format('Y/MM/DD');
    //const endAt = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = startAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        //endAt
      }
    });
  }*/

  handleWhen(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        when:event.target.value
      }
    })
  }

  handleGuests(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests:event.target.value
      }
    })
  }

  handleTime(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        time:event.target.value
      }
    })
  }
  handleusrContact(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        usrContact:event.target.value
      }
    })
  }

  handleAbout(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        about:event.target.value
      }
    })
  }
  handleWhat(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        what:event.target.value
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

  /*addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }*/

  resetData() {
    //this.dateRef.current.value = '';

    this.setState({proposedBooking: {guests: '',time:'',usrContact:'',about:'',what:'',when:''}});
  }

  confirmProposedData() {
    //const {startAt, endAt} = this.state.proposedBooking;
    //const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        //days,
        //totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  }

  reserveRental() {
    actions.createBooking(this.state.proposedBooking).then(
      (booking) => {
        //this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        //this.resetData();
        toast.success('Sikeres Előfoglalás');
      },
      (errors) => {
        this.setState({errors});
      })
  }

  render() {
    const { rental, auth: { isAuth } } = this.props;
    const { /*startAt, endAt,*/ guests,time,usrContact,about,what,when } = this.state.proposedBooking;

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
                   value={when}
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
                     value={guests}
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
                     value={time}
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
                     value={usrContact}
                     type='text'
                     className='form-control'
                     id='usrContact'
                     //aria-describedby='guests'
                     placeholder='Emailcímed vagy Telefonszámod'>
              </input>
            </div>

            <div className='form-group'>
              <label htmlFor='about'>Adatok az Oktatónak</label>
              <input onChange={(event) => { this.handleAbout(event)}}
              value={about}
              type='text'
              className='form-control'
              id='about'
              //aria-describedby='guests'
              placeholder='Hol Tanulsz, Szakod(ha van)'>

              </input>
            </div>

            <div className='form-group'>
              <label htmlFor='what'>Miből kéne Felkészülnöd</label>
              <input onChange={(event) => { this.handleWhat(event)}}
              value={what}
              type='text'
              className='form-control'
              id='what'
              //aria-describedby='guests'
              placeholder='pl.Függvényanalízis, Integrálás, stb.'>

              </input>
            </div>
            <button disabled={ !guests || !time ||!when || !usrContact || !what} onClick={() => this.confirmProposedData()} className='btn btn-bwm btn-confirm btn-block'>Foglalj Időpontot</button>
          </React.Fragment>
        }

        <BookingModal open={this.state.modal.open}
                      closeModal={this.cancelConfirmation}
                      confirmModal={this.reserveRental}
                      booking={this.state.proposedBooking}
                      errors={this.state.errors}
                      rentalPrice={rental.dailyRate}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Booking)

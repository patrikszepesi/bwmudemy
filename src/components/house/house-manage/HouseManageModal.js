import React from 'react';
import Modal from 'react-responsive-modal';
//import { pretifyDate } from 'helpers';

export class HouseManageModal extends React.Component {

  constructor() {

    super();

    this.state = {
      open: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }

  closeModal() {
   this.setState({open: false});
  }


  renderBookings(bookings) {

    return bookings.map((booking, index) =>

      <React.Fragment key={index}>
        <h6>FONTOS! Jelezz vissza a Diáknak minél elöbb a megadott Elérhetőségén</h6>
        <p><span>Konzultáció Időpontja: </span> {booking.when} , {booking.time}</p>
        <p><span>Diák Neve:</span> {booking.guestsH}</p>
        <p><span>Elérhetőség:</span> {booking.contactH} </p>
        <p><span>Hol Tanul:</span> {booking.descriptionH} </p>
        <p><span>Miből Kell Korrepetálni:</span>  {booking.guestsH}</p>
        { index + 1 !== bookings.length &&
          <hr></hr>
        }

      </React.Fragment>
    )

  }


  render() {
    const { bookings } = this.props;



    return (


      <React.Fragment>
      <button type='button' onClick={this.openModal} className='alert alert-danger'>Összes Foglalás megtekintése </button>
        <Modal open={this.state.open} onClose={this.closeModal} little classNames={{ modal: 'rental-booking-modal' }}>
           <h4 className='modal-title title'>Hozzám Foglalt Időpont</h4>
           <div className='modal-body bookings-inner-container'>


            {this.renderBookings(bookings)}


          </div>
          <div className='modal-footer'>
            <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Vissza</button>
          </div>
        </Modal>
      </React.Fragment>

    )
  }
}

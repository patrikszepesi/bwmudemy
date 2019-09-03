import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';

export class RentalManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    }

    this.deleteRental = this.deleteRental.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserRentals().then(
      userRentals => this.setState({userRentals, isFetching: false}),
      errors => this.setState({errors, isFetching: false}))
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) =>
     <RentalManageCard modal={<RentalManageModal bookings={rental.bookings}/>}
                       key={index}
                       rental={rental}
                       rentalIndex={index}
                       deleteRentalCb={this.deleteRental} />);
  }

  deleteRental(rentalId, rentalIndex) {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({userRentals});
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id='userRentals'>
        <ToastContainer />
        <h1 className='page-title'>Általam Oktatott Tantárgyak</h1>
        <div className='row'>
        {this.renderRentalCards(userRentals)}
        </div>
        { !isFetching && userRentals.length === 0 &&
          <div className='alert alert-warning'>
            Jelenleg nem vagy oktató, de kövesd a linket és könnyen lehetsz
            <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Oktató akarok lenni</Link>
          </div>
        }
      </section>
    )
  }
}

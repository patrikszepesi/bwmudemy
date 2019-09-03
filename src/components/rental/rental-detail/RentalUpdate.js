import React from 'react';
import { connect } from 'react-redux';
import RentalMap from './RentalMap';
import Booking from 'components/booking/Booking';

import { UserGuard } from '../../shared/auth/UserGuard';
//import { RentalAssets } from './RentalAssets';
//import { toUpperCase } from 'helpers';

import { EditableInput } from '../../shared/editable/EditableInput';
import { EditableText } from '../../shared/editable/EditableText';
import { EditableSelect } from '../../shared/editable/EditableSelect';
import { EditableImage } from '../../shared/editable/EditableImage';

import * as actions from 'actions';

class RentalUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }

    this.updateRental = this.updateRental.bind(this);
    this.resetRentalErrors = this.resetRentalErrors.bind(this);
    this.verifyRentalOwner = this.verifyRentalOwner.bind(this);
  }

  componentWillMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id;

    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  componentDidMount() {
    this.verifyRentalOwner();
  }

  updateRental(rentalData) {
    const {rental: {_id}, dispatch } = this.props;

    dispatch(actions.updateRental(_id, rentalData));
  }

  resetRentalErrors() {
    this.props.dispatch(actions.resetRentalErrors());
  }

  verifyRentalOwner() {
    const rentalId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyRentalOwner(rentalId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { rental, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (rental._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='rentalDetails'>
            <div className='upper-section'>
              <div className='row'>
                <div className='col-md-6'>
                  <EditableImage entity={rental}
                                 entityField={'image'}
                                 errors={errors}
                                 updateEntity={this.updateRental}> </EditableImage>
                </div>
                <div className='col-md-6'>
                  <RentalMap location={`${rental.city2}, ${rental.street}`} />
                </div>
              </div>
            </div>

            <div className='details-section'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='rental'>
                    <label className={`rental-label rental-type ${rental.category}`}> Csoportos óra? </label>
                    <EditableSelect entity={rental}
                                    entityField={'shared'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={[true, false]}
                                    containerStyle={{'display': 'inline-block'}}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors} />

                    <EditableSelect entity={rental}
                                    entityField={'category'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={['Egyetemi Tanár', 'Főiskolai Tanár','Középiskolai Tanár','Phd Hallgató', 'Teljes Állásban dolgozó','Egyetemi Demonstrátor','Gyakornok','Harmadéves Hallgató','Másodéves Hallgató','Elsőéves Hallgató','Középiskolai Diák','Egyéb']}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors} />


                    <div className="rental-owner">

                      <span>{rental.user && rental.user.username}</span>
                    </div>

                    <EditableInput entity={rental}
                                   entityField={'title'}
                                   className={'rental-title'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors}  />


                    <EditableInput entity={rental}
                                   entityField={'city2'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                  resetErrors={this.resetRentalErrors}  />

                    <EditableInput entity={rental}
                                   entityField={'street'}
                                   className={'rental-street'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors} />

                    <EditableInput entity={rental}
                                    entityField={'available'}
                                    updateEntity={this.updateRental}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors}  />

                    <EditableInput entity={rental}
                                    entityField={'dailyRate'}
                                    updateEntity={this.updateRental}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors}  />


                    <EditableInput entity={rental}
                                    entityField={'email'}
                                    updateEntity={this.updateRental}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors}  />

                    <EditableInput entity={rental}
                                    entityField={'contact2'}
                                    updateEntity={this.updateRental}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors}  />



                    
                    <EditableText  entity={rental}
                                   entityField={'description'}
                                   className={'rental-description'}
                                   updateEntity={this.updateRental}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors}  />
                    <hr></hr>

                  </div>
                </div>
                <div className='col-md-4'>
                 <Booking rental={rental} />
                </div>
              </div>
            </div>
          </section>
        </UserGuard>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalUpdate)

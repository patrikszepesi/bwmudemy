import React from 'react';
import { connect } from 'react-redux';
//import RentalMap from './RentalMap';
import HouseBooking from 'components/houseBooking/houseBooking';

import { UserGuard } from '../../shared/auth/UserGuard';
//import { RentalAssets } from './RentalAssets';
//import { toUpperCase } from 'helpers';

import { EditableInput } from '../../shared/editable/EditableInput';
import { EditableText } from '../../shared/editable/EditableText';
import { EditableSelect } from '../../shared/editable/EditableSelect';
import { EditableImage } from '../../shared/editable/EditableImage';

import * as actions from 'actions';

class HouseUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }

    this.updateHouse = this.updateHouse.bind(this);
    this.resetHouseErrors = this.resetHouseErrors.bind(this);
    this.verifyHouseOwner = this.verifyHouseOwner.bind(this);
  }

  componentWillMount() {
    // Dispatch action
    const houseId = this.props.match.params.id;

    this.props.dispatch(actions.fetchHouseById(houseId));
  }

  componentDidMount() {
    this.verifyRentalOwner();
  }

  updateHouse(houseData) {
    const {house: {_id}, dispatch } = this.props;

    dispatch(actions.updateHouse(_id, houseData));
  }

  resetHouseErrors() {
    this.props.dispatch(actions.resetHouseErrors());
  }

  verifyHouseOwner() {
    const houseId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyHouseOwner(houseId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { house, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (house._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='rentalDetails'>
            <div className='upper-section'>
              <div className='row'>
                <div className='col-md-6'>
                  <EditableImage entity={house}
                                 entityField={'image'}
                                 errors={errors}
                                 updateEntity={this.updateHouse}> </EditableImage>
                </div>
                <div className='col-md-6'>
                {/*  <RentalMap location={`${house.cityH}, ${house.streetH}`} />*/}
                </div>
              </div>
            </div>

            <div className='details-section'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='rental'>
                    <label className={`rental-label rental-type ${house.categoryH}`}> Csoportos óra? </label>
                    <EditableSelect entity={house}
                                    entityField={'shared'}
                                    className={`rental-type ${house.categoryH}`}
                                    updateEntity={this.updateHouse}
                                    options={[true, false]}
                                    containerStyle={{'display': 'inline-block'}}
                                    errors={errors}
                                    resetErrors={this.resetHouseErrors} />

                    <EditableSelect entity={house}
                                    entityField={'category'}
                                    className={`rental-type ${house.categoryH}`}
                                    updateEntity={this.updateHouse}
                                    options={['Egyetemi Tanár', 'Főiskolai Tanár','Középiskolai Tanár','Phd Hallgató', 'Teljes Állásban dolgozó','Egyetemi Demonstrátor','Gyakornok','Harmadéves Hallgató','Másodéves Hallgató','Elsőéves Hallgató','Középiskolai Diák','Egyéb']}
                                    errors={errors}
                                    resetErrors={this.resetHouseErrors} />


                    <div className="rental-owner">

                      <span>{house.user && house.user.username}</span>
                    </div>

                    <EditableInput entity={house}
                                   entityField={'title'}
                                   className={'rental-title'}
                                   updateEntity={this.updateHouse}
                                   errors={errors}
                                   resetErrors={this.resetHouseErrors}  />


                    <EditableInput entity={house}
                                   entityField={'city2'}
                                   updateEntity={this.updateHouse}
                                   errors={errors}
                                  resetErrors={this.resetHouseErrors}  />

                    <EditableInput entity={house}
                                   entityField={'street'}
                                   className={'rental-street'}
                                   updateEntity={this.updateHouse}
                                   errors={errors}
                                   resetErrors={this.resetHouseErrors} />

                    <EditableInput entity={house}
                                    entityField={'available'}
                                    updateEntity={this.updateRental}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors}  />

                    <EditableInput entity={house}
                                    entityField={'dailyRate'}
                                    updateEntity={this.updateHouse}
                                    errors={errors}
                                    resetErrors={this.resetHouseErrors}  />


                    <EditableInput entity={house}
                                    entityField={'email'}
                                    updateEntity={this.updateHouse}
                                    errors={errors}
                                    resetErrors={this.resetHouseErrors}  />

                    <EditableInput entity={house}
                                    entityField={'contact2'}
                                    updateEntity={this.updateHouse}
                                    errors={errors}
                                    resetErrors={this.resetHouseErrors}  />




                    <EditableText  entity={house}
                                   entityField={'description'}
                                   className={'rental-description'}
                                   updateEntity={this.updateHouse}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetHouseErrors}  />
                    <hr></hr>

                  </div>
                </div>
                <div className='col-md-4'>
                 <HouseBooking house={house} />
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
    house: state.house.data,
    errors: state.house.errors
  }
}

export default connect(mapStateToProps)(HouseUpdate)

import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import RentalListing from 'components/rental/rental-listing/RentalListing';
import HouseListing from 'components/house/house-listing/HouseListing';
import RentalSearchListing from 'components/rental/rental-listing/RentalSearchListing';
import HouseSearchListing from 'components/house/house-listing/HouseSearchListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail';
import HouseDetail from 'components/house/house-detail/HouseDetail';
import RentalUpdate from 'components/rental/rental-detail/RentalUpdate';
import HouseUpdate from 'components/house/house-detail/HouseUpdate';
import { RentalCreate } from 'components/rental/rental-create/RentalCreate';
import { HouseCreate } from 'components/house/house-create/HouseCreate';
import Login from 'components/login/Login';
import About from 'components/login/About';
import Help from 'components/login/Help';
import Lander from 'components/login/Lander';

import { Register } from 'components/register/Register';

import { RentalManage } from 'components/rental/rental-manage/RentalManage';
import { HouseManage } from 'components/house/house-manage/HouseManage';
import BookingManage from 'components/booking/booking-manage/BookingManage';
import HouseBookingManage from 'components/houseBooking/houseBooking-manage/HouseBookingManage';

import { ProtectedRoute } from 'components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from 'components/shared/auth/LoggedInRoute';

import * as actions from 'actions';

import 'App.css';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className='App'>
          <ToastContainer />
          <Header logout={this.logout}/>
          <div className='container'>

            <Switch>
              <Route exact path='/' component={Lander} />
              <Route exact path='/rentals' component={RentalListing} />
              <Route exact path='/houses' component={HouseListing} />
              <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
              <Route exact path='/houses/:city/homes' component={HouseSearchListing} />
              <ProtectedRoute exact path='/rentals/manage' component={RentalManage} />
              <ProtectedRoute exact path='/houses/manage' component={HouseManage} />
              <ProtectedRoute exact path='/bookings/manage' component={BookingManage} />
              <ProtectedRoute exact path='/housebookings/manage' component={HouseBookingManage} />
              <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
              <ProtectedRoute exact path='/houses/new' component={HouseCreate} />
              <ProtectedRoute exact path='/rentals/:id' component={RentalDetail} />
              <ProtectedRoute exact path='/houses/:id' component={HouseDetail} />
              <Route exact path='/rentals/:id/edit' component={RentalUpdate} />
              <Route exact path='/houses/:id/edit' component={HouseUpdate} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/about' component={About} />
              <Route exact path='/help' component={Help} />
              <LoggedInRoute exact path='/register' component={Register} />
            </Switch>
              <Footer/>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

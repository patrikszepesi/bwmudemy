import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FETCH_RENTAL_BY_ID_SUCCESS,
        FETCH_HOUSE_BY_ID_SUCCESS,
         FETCH_RENTAL_BY_ID_INIT,
         FETCH_HOUSE_BY_ID_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_HOUSES_SUCCESS,
         FETCH_RENTALS_INIT,
         FETCH_HOUSES_INIT,
         FETCH_RENTALS_FAIL,
         FETCH_HOUSES_FAIL,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_USER_BOOKINGS_SUCCESS,
         FETCH_USER_HOUSE_BOOKINGS_SUCCESS,
         FETCH_USER_BOOKINGS_FAIL,
         FETCH_USER_HOUSE_BOOKINGS_FAIL,
         FETCH_USER_BOOKINGS_INIT,
         FETCH_USER_HOUSE_BOOKINGS_INIT,
         UPDATE_RENTAL_SUCCESS,
         UPDATE_HOUSE_SUCCESS,
         UPDATE_RENTAL_FAIL,
         UPDATE_HOUSE_FAIL,
         RESET_RENTAL_ERRORS,
         RESET_HOUSE_ERRORS,
         RELOAD_MAP,
         RELOAD_MAP_FINISH,
         UPDATE_BOOKINGS,
         UPDATE_HOUSE_BOOKINGS
                        } from './types';

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
}
export const verifyHouseOwner = (houseId) => {
  return axiosInstance.get(`/houses/${houseId}/verify-user`);
}

export const reloadMap = () => {
  return {
    type: RELOAD_MAP
  }
}

export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH
  }
}

// RENTALS AND HOUSES ATIONS ---------------------------

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchHouseByIdInit = () => {
  return {
    type: FETCH_HOUSE_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fetchHouseByIdSuccess = (house) => {
  return {
    type: FETCH_HOUSE_BY_ID_SUCCESS,
    house
  }
}


const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}

const fetchHousesSuccess = (houses) => {
  return {
    type: FETCH_HOUSES_SUCCESS,
    houses
  }
}


const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchHousesInit = () => {
  return {
    type: FETCH_HOUSES_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}

const fetchHousesFail = (errors) => {
  return {
    type: FETCH_HOUSES_FAIL,
    errors
  }
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))
  }
}

export const fetchHouses = (city) => {
  const url = city ? `/houses?city=${city}` : '/houses';

  return dispatch => {
    dispatch(fetchHousesInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(houses => dispatch(fetchHousesSuccess(houses)))
      .catch(({response}) => dispatch(fetchHousesFail(response.data.errors)))
  }
}

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    return axios.get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data )
      .then(rental => {dispatch(fetchRentalByIdSuccess(rental));
          return rental;
      })
  }
}

export const fetchHouseById = (houseId) => {
  return function(dispatch) {
    dispatch(fetchHouseByIdInit());

    return axios.get(`/api/v1/houses/${houseId}`)
      .then(res => res.data )
      .then(house => {dispatch(fetchHouseByIdSuccess(house));
          return house;
      })
  }
}

export const createRental = (rentalData) => {
  return axiosInstance.post('/rentals', rentalData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const createHouse = (houseData) => {
  return axiosInstance.post('/houses', houseData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const resetRentalErrors = () => {
  return {
    type: RESET_RENTAL_ERRORS
  }
}

export const resetHouseErrors = () => {
  return {
    type: RESET_HOUSE_ERRORS
  }
}

const updateRentalSuccess = (updatedRental) => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  }
}

const updateHouseSuccess = (updatedHouse) => {
  return {
    type: UPDATE_HOUSE_SUCCESS,
    rental: updatedHouse
  }
}

const updateRentalFail = (errors) => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  }
}

const updateHouseFail = (errors) => {
  return {
    type: UPDATE_HOUSE_FAIL,
    errors
  }
}

export const updateRental = (id, rentalData) => dispatch => {
  return axiosInstance.patch(`/rentals/${id}`, rentalData)
    .then(res => res.data)
    .then(updatedRental => {
      dispatch(updateRentalSuccess(updatedRental));

      if (rentalData.city || rentalData.street) {
        dispatch(reloadMap());
      }
    })
    .catch(({response}) => dispatch(updateRentalFail(response.data.errors)))
}

export const updateHouse = (id, houseData) => dispatch => {
  return axiosInstance.patch(`/houses/${id}`, houseData)
    .then(res => res.data)
    .then(updatedHouse => {
      dispatch(updateHouseSuccess(updatedHouse));

      if (houseData.city || houseData.street) {
        dispatch(reloadMap());
      }
    })
    .catch(({response}) => dispatch(updateHouseFail(response.data.errors)))
}

// USER BOOKINGS ACTIONS ---------------------------

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserHouseBookingsInit = () => {
  return {
    type: FETCH_USER_HOUSE_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userHouseBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userHouseBookings
  }
}


const fetchUserHouseBookingsSuccess = (userHouseBookings) => {
  return {
    type: FETCH_USER_HOUSE_BOOKINGS_SUCCESS,
    userHouseBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

const fetchUserHouseBookingsFail = (errors) => {
  return {
    type: FETCH_USER_HOUSE_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get('/bookings/manage')
      .then(res => res.data )
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))
  }
}

export const fetchUserHouseBookings = () => {
  return dispatch => {
    dispatch(fetchUserHouseBookingsInit());

    axiosInstance.get('/housebookings/manage')
      .then(res => res.data )
      .then(userHouseBookings => dispatch(fetchUserHouseBookingsSuccess(userHouseBookings)))
      .catch(({response}) => dispatch(fetchUserHouseBookingsFail(response.data.errors)))
  }
}
// USER RENTALS AND HOUSES ACTIONS ---------------------------

export const updateBookings = (bookings) =>{
  return{
    type:UPDATE_BOOKINGS,
    bookings
  }
}

export const updateHouseBookings = (houseBookings) =>{
  return{
    type:UPDATE_HOUSE_BOOKINGS,
    houseBookings
  }
}

export const getUserRentals = () => {
  return axiosInstance.get('/rentals/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const getUserHouses = () => {
  return axiosInstance.get('/houses/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

export const deleteHouse = (houseId) => {
  return axiosInstance.delete(`/houses/${houseId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
}

export const createHouseBooking = (houseBooking) => {
  return axiosInstance.post('/housebookings', houseBooking)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
}



export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);

  return axiosInstance.post('/image-upload', formData)
    .then(json => {
      return json.data.imageUrl;
    })
    .catch(({response}) => Promise.reject(response.data.errors[0]))
}

export const createReview=(reviewData,housebookingId)=>{
  return axiosInstance.post(`/reviews?housebookingId=${housebookingId}`,reviewData)
  .then(res=>res.data)
  .catch(({response}) => Promise.reject(response.data.errors[0]))
}

export const createHouseReview=(reviewHData,houseBookingId)=>{
  return axiosInstance.post(`/reviews?bookingId=${houseBookingId}`,reviewHData)
  .then(res=>res.data)
  .catch(({response}) => Promise.reject(response.data.errors[0]))
}

export const getReviews=(rentalId)=>{
  return axiosInstance.get(`/reviews?rentalId=${rentalId}`)
  .then(res => res.data)
  .catch(({response}) => Promise.reject(response.data.errors[0]))
}

export const getHouseReviews=(houseId)=>{
  return axiosInstance.get(`/reviews?houseId=${houseId}`)
  .then(res => res.data)
  .catch(({response}) => Promise.reject(response.data.errors[0]))
}

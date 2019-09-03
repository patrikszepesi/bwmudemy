import  { FETCH_USER_HOUSE_BOOKINGS_SUCCESS,
          FETCH_USER_HOUSE_BOOKINGS_FAIL,
          FETCH_USER_HOUSE_BOOKINGS_INIT,
          UPDATE_HOUSE_BOOKINGS } from 'actions/types';

const INITIAL_STATEH = {
  data: [],
  errors: [],
  isFetching: false
}

export const userBookingsReducer = (state = INITIAL_STATEH, action) => {
  switch(action.type) {
  case FETCH_USER_HOUSE_BOOKINGS_INIT:
      return {...state, data: [], errors: [], isFetching: true};
    case FETCH_USER_HOUSE_BOOKINGS_SUCCESS:
      return {...state, data: action.userBookings, errors: [], isFetching: false};
    case FETCH_USER_HOUSE_BOOKINGS_FAIL:
      return {...state, errors: [], data: [], isFetching: false};
    case UPDATE_HOUSE_BOOKINGS:
        return {...state,  data:action.houseBookings, };//check if actually houseBookings
    default:
      return state;
  }
}

import { FETCH_HOUSE_BY_ID_SUCCESS,
         FETCH_HOUSE_BY_ID_INIT,
         FETCH_HOUSES_SUCCESS,
         FETCH_HOUSES_INIT,
         FETCH_HOUSES_FAIL,
         UPDATE_HOUSE_SUCCESS,
         UPDATE_HOUSE_FAIL,
         RESET_HOUSE_ERRORS } from '../actions/types';

const INITIAL_STATEH = {
  houses: {
    data: [],
    errors: []
  },
  house: {
    data: {},
    errors: []
  }
}


export const houseReducer = (state = INITIAL_STATEH.houses, action) => {
  switch(action.type) {
    case FETCH_HOUSES_INIT:
      return {...state, data: [], errors: []};
    case FETCH_HOUSES_SUCCESS:
      return {...state, data: action.houses};
    case FETCH_HOUSES_FAIL:
      return Object.assign({}, state, {errors: action.errors, data: []});
    default:
      return state;
  }
}


export const selectedHouseReducer = (state = INITIAL_STATEH.house, action) => {
  switch(action.type) {
    case FETCH_HOUSE_BY_ID_INIT:
      return {...state, data: {}};
    case FETCH_HOUSE_BY_ID_SUCCESS:
      return Object.assign({}, state, { data: action.house});
    case UPDATE_HOUSE_SUCCESS:
      return {...state, data: action.house};
    case UPDATE_HOUSE_FAIL:
      return {...state, errors: action.errors};
    case RESET_HOUSE_ERRORS:
      return {...state, errors: []};
    default:
      return state;
  }
}

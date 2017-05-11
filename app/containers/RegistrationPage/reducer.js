/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_ERROR,
  CLEAR_ERROR,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  error: '',
  currentlySending: false,
});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    default:
      return state;
  }
}

export default registrationPageReducer;

/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_ERROR,
  SENDING_REQUEST,
  UNUSED_USERNAME,
  UNUSED_EMAIL,
} from './constants';

const initialState = fromJS({
  error: '',
  currentlySending: false,
  unusedUsername: false,
  unusedEmail: false,
});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ERROR:
      return state
        .set('error', action.error);
    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);
    case UNUSED_USERNAME:
      return state
        .set('unusedUsername', action.unused);
    case UNUSED_EMAIL:
      return state
        .set('unusedEmail', action.unused);
    default:
      return state;
  }
}

export default registrationPageReducer;

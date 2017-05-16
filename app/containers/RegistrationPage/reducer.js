/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SENDING_REQUEST,
  UNUSED_USERNAME,
  UNUSED_EMAIL,
} from './constants';

export const initialState = fromJS({
  requestError: '',
  currentlySending: false,
  unusedUsername: true,
  unusedEmail: true,
});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
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

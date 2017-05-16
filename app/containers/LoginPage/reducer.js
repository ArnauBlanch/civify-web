/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SENDING_REQUEST,
  LOGIN_FAILED,
} from './constants';

const initialState = fromJS({
  currentlySending: false,
  loginError: undefined,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case LOGIN_FAILED:
      return state.set('loginError', action.error);
    default:
      return state;
  }
}

export default loginPageReducer;

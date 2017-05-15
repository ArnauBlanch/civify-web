/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SENDING_REQUEST,
  // LOGIN_SUCCESS,
  LOGIN_FAILED,
} from './constants';

const initialState = fromJS({
  currentlySending: false,
  loginError: undefined,
  // isAuthenticated: localStorage.getItem('auth_token') !== null,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    /* case LOGIN_SUCCESS:
      return state
        .set('loginError', undefined)
        .set('isAuthenticated', true); */
    case LOGIN_FAILED:
      return state.set('loginError', action.error);
    default:
      return state;
  }
}

export default loginPageReducer;

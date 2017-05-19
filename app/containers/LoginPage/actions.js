/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_REQUEST,
  SENDING_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
  LOGOUT_REQUEST,
} from './constants';

export function loginRequest(user) {
  return { type: LOGIN_REQUEST, user };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

export function loginFailed(error) {
  return { type: LOGIN_FAILED, error };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function userInfoRequest() {
  return { type: USER_INFO_REQUEST };
}

export function userInfoFailed() {
  return { type: USER_INFO_FAILED };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

/*
 *
 * RegistrationPage actions
 *
 */

import {
  REGISTER_REQUEST,
  SENDING_REQUEST,
  REQUEST_ERROR,
} from './constants';

export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

export function requestError(error) {
  return { type: REQUEST_ERROR, error };
}

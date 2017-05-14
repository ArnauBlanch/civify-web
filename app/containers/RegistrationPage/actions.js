/*
 *
 * RegistrationPage actions
 *
 */

import {
  REGISTER_REQUEST,
  SENDING_REQUEST,
  CHECK_UNUSED_USERNAME,
  CHECK_UNUSED_EMAIL,
  UNUSED_USERNAME,
  UNUSED_EMAIL,
} from './constants';

export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

export function checkUnusedUsername(username) {
  return { type: CHECK_UNUSED_USERNAME, username };
}

export function checkUnusedEmail(email) {
  return { type: CHECK_UNUSED_EMAIL, email };
}

export function unusedUsername(unused) {
  return { type: UNUSED_USERNAME, unused };
}

export function unusedEmail(unused) {
  return { type: UNUSED_EMAIL, unused };
}

/*
 *
 * ResetPassword actions
 *
 */

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './constants';

export function resetPasswordRequest(token, email, requestBody) {
  return { type: RESET_PASSWORD_REQUEST, token, email, requestBody };
}

export function resetPasswordSuccess() {
  return { type: RESET_PASSWORD_SUCCESS };
}

export function resetPasswordFailure(error) {
  return { type: RESET_PASSWORD_FAILURE, error };
}

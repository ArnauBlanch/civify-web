/*
 *
 * RecoverPassword actions
 *
 */

import {
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
} from './constants';

export function recoverPasswordRequest(email) {
  return { type: RECOVER_PASSWORD_REQUEST, email };
}

export function recoverPasswordSuccess() {
  return { type: RECOVER_PASSWORD_SUCCESS };
}

export function recoverPasswordFailure(notFound) {
  return { type: RECOVER_PASSWORD_FAILURE, notFound };
}

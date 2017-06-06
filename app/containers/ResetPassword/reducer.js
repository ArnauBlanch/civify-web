/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './constants';

const initialState = fromJS({
  error: false,
  reset: false,
  expired: false,
  notFound: false,
  invalidToken: false,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return state
      .set('error', false)
      .set('reset', false)
      .set('expired', false)
      .set('notFound', false)
      .set('invalidToken', false);
    case RESET_PASSWORD_SUCCESS:
      return state
      .set('error', false)
      .set('reset', true)
      .set('expired', false)
      .set('notFound', false)
      .set('invalidToken', false);
    case RESET_PASSWORD_FAILURE:
      return state
      .set('error', action.error !== 'expired' && action.error !== 'notFound' && action.error !== 'invalidToken')
      .set('reset', false)
      .set('expired', action.error === 'expired')
      .set('notFound', action.error === 'notFound')
      .set('invalidToken', action.error === 'invalidToken');
    default:
      return state;
  }
}

export default resetPasswordReducer;

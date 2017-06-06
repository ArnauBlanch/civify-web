/*
 *
 * RecoverPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
} from './constants';

const initialState = fromJS({
  error: false,
  sent: false,
  notFound: false,
});

function recoverPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RECOVER_PASSWORD_REQUEST:
      return state.set('error', false).set('sent', false).set('notFound', false);
    case RECOVER_PASSWORD_SUCCESS:
      return state.set('error', false).set('sent', true).set('notFound', false);
    case RECOVER_PASSWORD_FAILURE:
      return state.set('error', !action.notFound).set('notFound', action.notFound);
    default:
      return state;
  }
}

export default recoverPasswordReducer;

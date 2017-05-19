/*
 *
 * ValidateRewardsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REWARD_VALIDATED,
  REWARD_INVALID,
  REWARD_ALREADY_USED,
  CLEAR_VALIDATION,
  VALIDATE_ERROR,
} from './constants';
import {
  VALIDATED,
  INVALID,
  ALREADY_USED,
} from './RewardStatus';

const initialState = fromJS({
  status: undefined,
  error: false,
});

function validateRewardsPageReducer(state = initialState, action) {
  switch (action.type) {
    case REWARD_VALIDATED:
      return state.set('status', fromJS(VALIDATED)).set('error', false);
    case REWARD_ALREADY_USED:
      return state.set('status', fromJS(ALREADY_USED)).set('error', false);
    case REWARD_INVALID:
      return state.set('status', fromJS(INVALID)).set('error', false);
    case VALIDATE_ERROR:
      return state.set('error', true);
    case CLEAR_VALIDATION:
      return state.set('error', false).set('status', undefined);
    default:
      return state;
  }
}

export default validateRewardsPageReducer;

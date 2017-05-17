/*
 *
 * CreateReward reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_REWARD_SUCCESS,
  CREATE_REWARD_FAILED,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  currentlySending: false,
  rewardError: false,
});

function createRewardReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case CREATE_REWARD_SUCCESS:
      return state.set('rewardError', false);
    case CREATE_REWARD_FAILED:
      return state.set('rewardError', true);
    default:
      return state;
  }
}

export default createRewardReducer;

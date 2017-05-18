/*
 *
 * RewardsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAILED,
} from './constants';

const initialState = fromJS({
  rewards: [],
  error: false,
});

function rewardsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REWARDS_SUCCESS:
      return state.set('rewards', fromJS(action.rewards))
                  .set('error', false);
    case GET_REWARDS_FAILED:
      return state.set('error', true);
    default:
      return state;
  }
}

export default rewardsPageReducer;

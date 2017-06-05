/*
 *
 * AchievementsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ACHIEVEMENTS_SUCCESS,
  GET_ACHIEVEMENTS_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

const initialState = fromJS({
  achievements: undefined,
  error: false,
  currentlySending: false,
});

function achievementsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACHIEVEMENTS_SUCCESS:
      return state.set('achievements', action.achievements).set('error', false);
    case GET_ACHIEVEMENTS_FAILURE:
      return state.set('error', true);
    case CURRENTLY_SENDING:
      return state.set('currentlySending', action.sending);
    default:
      return state;
  }
}

export default achievementsPageReducer;

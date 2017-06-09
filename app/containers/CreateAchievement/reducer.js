/*
 *
 * CreateAchievement reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_ACHIEVEMENT_SUCCESS,
  CREATE_ACHIEVEMENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  currentlySending: false,
  achievementError: false,
  alreadyExists: false,
});

function createAchievementReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case CREATE_ACHIEVEMENT_SUCCESS:
      return state.set('achievementError', false).set('alreadyExists', false);
    case CREATE_ACHIEVEMENT_FAILURE:
      return state.set('achievementError', true)
        .set('alreadyExists', action.alreadyExists);
    default:
      return state;
  }
}

export default createAchievementReducer;

/*
 *
 * EditAchievement reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ACHIEVEMENT_REQUEST,
  GET_ACHIEVEMENT_SUCCESS,
  GET_ACHIEVEMENT_FAILURE,
  EDIT_ACHIEVEMENT_SUCCESS,
  EDIT_ACHIEVEMENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  achievement: undefined,
  getError: false,
  currentlySending: false,
  editError: false,
  alreadyExists: false,
});

function editAchievementReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case GET_ACHIEVEMENT_REQUEST:
      return state.set('editError', false).set('alreadyExists', false);
    case GET_ACHIEVEMENT_SUCCESS:
      return state.set('getError', false).set('achievement', fromJS(action.achievement));
    case GET_ACHIEVEMENT_FAILURE:
      return state.set('getError', true);
    case EDIT_ACHIEVEMENT_SUCCESS:
      return state.set('editError', false).set('alreadyExists', false);
    case EDIT_ACHIEVEMENT_FAILURE:
      return state.set('editError', true).set('alreadyExists', action.alreadyExists);
    default:
      return state;
  }
}

export default editAchievementReducer;

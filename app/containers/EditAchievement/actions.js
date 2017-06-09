/*
 *
 * CreateAchievement actions
 *
 */

import {
  GET_ACHIEVEMENT_REQUEST,
  GET_ACHIEVEMENT_SUCCESS,
  GET_ACHIEVEMENT_FAILURE,
  EDIT_ACHIEVEMENT_REQUEST,
  EDIT_ACHIEVEMENT_SUCCESS,
  EDIT_ACHIEVEMENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

export function getAchievementRequest(achievementID) {
  return { type: GET_ACHIEVEMENT_REQUEST, achievementID };
}

export function getAchievementSuccess(achievement) {
  return { type: GET_ACHIEVEMENT_SUCCESS, achievement };
}

export function getAchievementFailure() {
  return { type: GET_ACHIEVEMENT_FAILURE };
}

export function editAchievementRequest(achievementID, newValues, isEditing) {
  return { type: EDIT_ACHIEVEMENT_REQUEST, achievementID, newValues, isEditing };
}

export function editAchievementSuccess() {
  return { type: EDIT_ACHIEVEMENT_SUCCESS };
}

export function editAchievementFailure(alreadyExists) {
  return { type: EDIT_ACHIEVEMENT_FAILURE, alreadyExists };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

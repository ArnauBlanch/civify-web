/*
 *
 * CreateAchievement actions
 *
 */

import {
  CREATE_ACHIEVEMENT_REQUEST,
  CREATE_ACHIEVEMENT_SUCCESS,
  CREATE_ACHIEVEMENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

export function createAchievementRequest(achievement) {
  return { type: CREATE_ACHIEVEMENT_REQUEST, achievement };
}

export function createAchievementSuccess() {
  return { type: CREATE_ACHIEVEMENT_SUCCESS };
}

export function createAchievementFailure(alreadyExists) {
  return { type: CREATE_ACHIEVEMENT_FAILURE, alreadyExists };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/*
 *
 * AchievementsPage actions
 *
 */

import {
  GET_ACHIEVEMENTS_REQUEST,
  GET_ACHIEVEMENTS_SUCCESS,
  GET_ACHIEVEMENTS_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

export function getAchievementsRequest(enabled) {
  return { type: GET_ACHIEVEMENTS_REQUEST, enabled };
}

export function getAchievementsSuccess(achievements) {
  return { type: GET_ACHIEVEMENTS_SUCCESS, achievements };
}

export function getAchievementsFailure() {
  return { type: GET_ACHIEVEMENTS_FAILURE };
}

export function currentlySending(sending) {
  return { type: CURRENTLY_SENDING, sending };
}

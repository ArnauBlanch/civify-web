/*
 *
 * RewardsPage actions
 *
 */

import {
  GET_REWARDS_REQUEST,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAILED,
} from './constants';

export function getRewardsRequest() {
  return { type: GET_REWARDS_REQUEST };
}

export function getRewardsSuccess(rewards) {
  return { type: GET_REWARDS_SUCCESS, rewards };
}

export function getRewardsFailed() {
  return { type: GET_REWARDS_FAILED };
}

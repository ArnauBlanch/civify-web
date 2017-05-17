/*
 *
 * CreateReward actions
 *
 */

import {
  CREATE_REWARD_REQUEST,
  CREATE_REWARD_SUCCESS,
  CREATE_REWARD_FAILED,
  SENDING_REQUEST,
} from './constants';

export function createRewardRequest(reward) {
  return { type: CREATE_REWARD_REQUEST, reward };
}

export function createRewardSuccess() {
  return { type: CREATE_REWARD_SUCCESS };
}

export function createRewardFailed() {
  return { type: CREATE_REWARD_FAILED };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/*
 *
 * ValidateRewardsPage actions
 *
 */

import {
  VALIDATE_REQUEST,
  REWARD_ALREADY_USED,
  REWARD_INVALID,
  REWARD_VALIDATED,
  VALIDATE_ERROR,
  CLEAR_VALIDATION,
} from './constants';

export function validateRequest(code) {
  return { type: VALIDATE_REQUEST, code };
}

export function rewardAlreadyUsed() {
  return { type: REWARD_ALREADY_USED };
}

export function rewardInvalid() {
  return { type: REWARD_INVALID };
}

export function rewardValidated() {
  return { type: REWARD_VALIDATED };
}

export function validateError() {
  return { type: VALIDATE_ERROR };
}

export function clearValidation() {
  return { type: CLEAR_VALIDATION };
}

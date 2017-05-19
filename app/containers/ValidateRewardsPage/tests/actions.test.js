import { actionTest } from 'redux-jest';
import {
  rewardAlreadyUsed,
  rewardValidated,
  rewardInvalid,
  validateRequest,
  validateError,
  clearValidation,
} from '../actions';
import {
  VALIDATE_REQUEST,
  REWARD_ALREADY_USED,
  REWARD_INVALID,
  REWARD_VALIDATED,
  VALIDATE_ERROR,
  CLEAR_VALIDATION,
} from '../constants';

describe('ValidateRewardsPage actions', () => {
  actionTest('should create an action to validate a reward',
    validateRequest,
    'test',
    { type: VALIDATE_REQUEST, code: 'test' }
  );

  actionTest('should create an action to notify that the reward code is already used',
    rewardAlreadyUsed,
    undefined,
    { type: REWARD_ALREADY_USED }
  );

  actionTest('should create an action to notify that the reward code is invalid',
    rewardInvalid,
    undefined,
    { type: REWARD_INVALID }
  );

  actionTest('should create an action to notify that the reward code has been validated',
    rewardValidated,
    undefined,
    { type: REWARD_VALIDATED }
  );

  actionTest('should create an action to notify that there was an error while validating',
    validateError,
    undefined,
    { type: VALIDATE_ERROR }
  );

  actionTest('should create an action to clear the validation error and status',
    clearValidation,
    undefined,
    { type: CLEAR_VALIDATION }
  );
});

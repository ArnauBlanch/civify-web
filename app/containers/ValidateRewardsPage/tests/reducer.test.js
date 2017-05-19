import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import validateRewardsPageReducer from '../reducer';
import {
  rewardValidated,
  rewardInvalid,
  rewardAlreadyUsed,
  validateError,
  clearValidation,
} from '../actions';

import {
  VALIDATED,
  INVALID,
  ALREADY_USED,
} from '../RewardStatus';

describe('validateRewardsPageReducer', () => {
  reducerTest(
    'should set the validation status to VALIDATED and clear errors',
    validateRewardsPageReducer,
    fromJS({ error: true, status: undefined }),
    rewardValidated(),
    fromJS({ error: false, status: fromJS(VALIDATED) })
  );

  reducerTest(
    'should set the validation status to INVALID and clear errors',
    validateRewardsPageReducer,
    fromJS({ error: true, status: undefined }),
    rewardInvalid(),
    fromJS({ error: false, status: fromJS(INVALID) })
  );

  reducerTest(
    'should set the validation status to ALREADY_USED and clear errors',
    validateRewardsPageReducer,
    fromJS({ error: true, status: undefined }),
    rewardAlreadyUsed(),
    fromJS({ error: false, status: fromJS(ALREADY_USED) })
  );

  reducerTest(
    'should set error as true',
    validateRewardsPageReducer,
    fromJS({ error: false }),
    validateError(),
    fromJS({ error: true })
  );

  reducerTest(
    'should clear the previous validation code and error',
    validateRewardsPageReducer,
    fromJS({ error: false, status: fromJS(ALREADY_USED) }),
    clearValidation(),
    fromJS({ error: false, status: undefined })
  );

  reducerTest(
    'should not change the current state',
    validateRewardsPageReducer,
    fromJS({ status: 'test', error: 'test' }),
    { type: undefined },
    fromJS({ status: 'test', error: 'test' })
  );
});

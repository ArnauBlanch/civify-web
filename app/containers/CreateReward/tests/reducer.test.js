import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import createRewardReducer from '../reducer';
import {
  createRewardFailed,
  createRewardSuccess,
  sendingRequest,
} from '../actions';

describe('createRewardReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    createRewardReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the request failed',
    createRewardReducer,
    fromJS({ rewardError: false }),
    createRewardFailed(),
    fromJS({ rewardError: true })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    createRewardReducer,
    fromJS({ rewardError: true }),
    createRewardSuccess(),
    fromJS({ rewardError: false })
  );

  reducerTest(
    'should not change the current state',
    createRewardReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

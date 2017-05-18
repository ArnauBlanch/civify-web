import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import rewardsPageReducer from '../reducer';
import {
  getRewardsSuccess,
  getRewardsFailed,
} from '../actions';

const rewards = [{ id: 'a' }, { id: 'b' }];

describe('rewardsPageReducer', () => {
  reducerTest(
    'should update rewards and clear error when the request succeeds',
    rewardsPageReducer,
    fromJS({ rewards: [], error: true }),
    getRewardsSuccess(rewards),
    fromJS({ rewards: rewards, error: false })
  );

  reducerTest(
    'should update if the username requested is unused',
    rewardsPageReducer,
    fromJS({ error: false }),
    getRewardsFailed(),
    fromJS({ error: true })
  );

  reducerTest(
    'should not change the current state',
    rewardsPageReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import createAchievementReducer from '../reducer';
import {
  createAchievementFailure,
  createAchievementSuccess,
  sendingRequest,
} from '../actions';

describe('createAchievementReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    createAchievementReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the request failed',
    createAchievementReducer,
    fromJS({ achievementError: false, alreadyExists: false }),
    createAchievementFailure(false),
    fromJS({ achievementError: true, alreadyExists: false })
  );

  reducerTest(
    'should update if the request failed because it already exists',
    createAchievementReducer,
    fromJS({ achievementError: false, alreadyExists: true }),
    createAchievementFailure(true),
    fromJS({ achievementError: true, alreadyExists: true })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    createAchievementReducer,
    fromJS({ achievementError: true, alreadyExists: true }),
    createAchievementSuccess(),
    fromJS({ achievementError: false, alreadyExists: false })
  );

  reducerTest(
    'should not change the current state',
    createAchievementReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

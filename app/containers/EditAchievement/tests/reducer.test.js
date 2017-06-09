import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import editAchievementReducer from '../reducer';
import {
  getAchievementRequest,
  getAchievementFailure,
  getAchievementSuccess,
  editAchievementFailure,
  editAchievementSuccess,
  sendingRequest,
} from '../actions';

describe('editAchievementReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    editAchievementReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should clear the edit error when requesting an achievement',
    editAchievementReducer,
    fromJS({ editError: true, alreadyExists: true }),
    getAchievementRequest('12345'),
    fromJS({ editError: false, alreadyExists: false })
  );

  reducerTest(
    'should update if the get request failed',
    editAchievementReducer,
    fromJS({ getError: false, achievement: undefined }),
    getAchievementFailure(),
    fromJS({ getError: true, achievement: undefined })
  );

  reducerTest(
    'should clear errors if the edit request succeeded',
    editAchievementReducer,
    fromJS({ editError: true, alreadyExists: true }),
    editAchievementSuccess({ id: 1 }),
    fromJS({ editError: false, alreadyExists: false })
  );

  reducerTest(
    'should update if the edit request failed',
    editAchievementReducer,
    fromJS({ editError: false, alreadyExists: false }),
    editAchievementFailure(false),
    fromJS({ editError: true, alreadyExists: false })
  );

  reducerTest(
    'should update if the edit request failed because it already exists',
    editAchievementReducer,
    fromJS({ editError: false, alreadyExists: false }),
    editAchievementFailure(true),
    fromJS({ editError: true, alreadyExists: true })
  );

  reducerTest(
    'should clear errors if the get request succeeded',
    editAchievementReducer,
    fromJS({ getError: true, achievement: undefined }),
    getAchievementSuccess({ id: 1 }),
    fromJS({ getError: false, achievement: { id: 1 } })
  );

  reducerTest(
    'should not change the current state',
    editAchievementReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import editAchievementReducer from '../reducer';
import {
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
    'should update if the get request failed',
    editAchievementReducer,
    fromJS({ getError: false, achievement: undefined }),
    getAchievementFailure(),
    fromJS({ getError: true, achievement: undefined })
  );

  reducerTest(
    'should clear errors if the edit request succeeded',
    editAchievementReducer,
    fromJS({ editError: true }),
    editAchievementSuccess({ id: 1 }),
    fromJS({ editError: false })
  );

  reducerTest(
    'should update if the edit request failed',
    editAchievementReducer,
    fromJS({ editError: false }),
    editAchievementFailure(),
    fromJS({ editError: true })
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

import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import achievementsPageReducer from '../reducer';
import {
  currentlySending,
  getAchievementsSuccess,
  getAchievementsFailure,
} from '../actions';

describe('achievementsPageReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    achievementsPageReducer,
    fromJS({ currentlySending: false }),
    currentlySending(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the request failed',
    achievementsPageReducer,
    fromJS({ achievements: undefined, error: false }),
    getAchievementsFailure(),
    fromJS({ achievements: undefined, error: true })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    achievementsPageReducer,
    fromJS({ achievements: undefined, error: true }),
    getAchievementsSuccess([{ id: 1 }, { id: 2 }]),
    fromJS({ achievements: [{ id: 1 }, { id: 2 }], error: false })
  );

  reducerTest(
    'should not change the current state',
    achievementsPageReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

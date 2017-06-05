import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import eventsPageReducer from '../reducer';
import {
  currentlySending,
  getEventsSuccess,
  getEventsFailure,
} from '../actions';

describe('eventsPageReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    eventsPageReducer,
    fromJS({ currentlySending: false }),
    currentlySending(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the request failed',
    eventsPageReducer,
    fromJS({ events: undefined, error: false }),
    getEventsFailure(),
    fromJS({ events: undefined, error: true })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    eventsPageReducer,
    fromJS({ events: undefined, error: true }),
    getEventsSuccess([{ id: 1 }, { id: 2 }]),
    fromJS({ events: [{ id: 1 }, { id: 2 }], error: false })
  );

  reducerTest(
    'should not change the current state',
    eventsPageReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

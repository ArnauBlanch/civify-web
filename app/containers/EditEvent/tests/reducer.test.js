import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import editEventReducer from '../reducer';
import {
  getEventRequest,
  getEventFailure,
  getEventSuccess,
  editEventFailure,
  editEventSuccess,
  sendingRequest,
} from '../actions';

describe('editEventReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    editEventReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should clear the edit error when requesting an event',
    editEventReducer,
    fromJS({ editError: true, alreadyExists: true, datesError: true }),
    getEventRequest('12345'),
    fromJS({ editError: false, alreadyExists: false, datesError: false })
  );

  reducerTest(
    'should update if the get request failed',
    editEventReducer,
    fromJS({ getError: false, event: undefined }),
    getEventFailure(),
    fromJS({ getError: true, event: undefined })
  );

  reducerTest(
    'should clear errors if the edit request succeeded',
    editEventReducer,
    fromJS({ editError: true, alreadyExists: true, datesError: true }),
    editEventSuccess({ id: 1 }),
    fromJS({ editError: false, alreadyExists: false, datesError: false })
  );

  reducerTest(
    'should update if the edit request failed',
    editEventReducer,
    fromJS({ editError: false, datesError: false, alreadyExists: false }),
    editEventFailure(false, false),
    fromJS({ editError: true, datesError: false, alreadyExists: false })
  );

  reducerTest(
    'should update if the edit request failed because the dates are invalid',
    editEventReducer,
    fromJS({ editError: false, datesError: false, alreadyExists: false }),
    editEventFailure(false, true),
    fromJS({ editError: true, datesError: true, alreadyExists: false })
  );

  reducerTest(
    'should update if the edit request failed because it already exists',
    editEventReducer,
    fromJS({ editError: false, datesError: false, alreadyExists: false }),
    editEventFailure(true, false),
    fromJS({ editError: true, datesError: false, alreadyExists: true })
  );

  reducerTest(
    'should clear errors if the get request succeeded',
    editEventReducer,
    fromJS({ getError: true, event: undefined }),
    getEventSuccess({ id: 1 }),
    fromJS({ getError: false, event: { id: 1 } })
  );

  reducerTest(
    'should not change the current state',
    editEventReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import createEventReducer from '../reducer';
import {
  createEventFailure,
  createEventSuccess,
  sendingRequest,
} from '../actions';

describe('createEventReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    createEventReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the request failed',
    createEventReducer,
    fromJS({ eventError: false, alreadyExists: false, datesError: false }),
    createEventFailure(false),
    fromJS({ eventError: true, alreadyExists: false, datesError: false })
  );

  reducerTest(
    'should update if the request failed because the dates are invalid',
    createEventReducer,
    fromJS({ eventError: false, alreadyExists: false, datesError: false }),
    createEventFailure(false),
    fromJS({ eventError: true, alreadyExists: false, datesError: true })
  );

  reducerTest(
    'should update if the request failed because it already exists',
    createEventReducer,
    fromJS({ eventError: false, alreadyExists: true, datesError: false }),
    createEventFailure(true),
    fromJS({ eventError: true, alreadyExists: true, datesError: false })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    createEventReducer,
    fromJS({ eventError: true, alreadyExists: true, datesError: true }),
    createEventSuccess(),
    fromJS({ eventError: false, alreadyExists: false, datesError: false })
  );

  reducerTest(
    'should not change the current state',
    createEventReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

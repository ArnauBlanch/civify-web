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
    fromJS({ eventError: false, alreadyExists: false }),
    createEventFailure(false),
    fromJS({ eventError: true, alreadyExists: false })
  );

  reducerTest(
    'should update if the request failed because it already exists',
    createEventReducer,
    fromJS({ eventError: false, alreadyExists: true }),
    createEventFailure(true),
    fromJS({ eventError: true, alreadyExists: true })
  );

  reducerTest(
    'should clear errors if the request succeeded',
    createEventReducer,
    fromJS({ eventError: true, alreadyExists: true }),
    createEventSuccess(),
    fromJS({ eventError: false, alreadyExists: false })
  );

  reducerTest(
    'should not change the current state',
    createEventReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

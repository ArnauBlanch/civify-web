import { reducerTest } from 'redux-jest'; // eslint-disable-line
import { fromJS } from 'immutable';
import registrationPageReducer from '../reducer';
import {
  sendingRequest,
  unusedUsername,
  unusedEmail,
} from '../actions';

describe('registrationPageReducer', () => {
  reducerTest(
    'should update \'currently sending request flag\'',
    registrationPageReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update if the username requested is unused',
    registrationPageReducer,
    fromJS({ unusedUsername: true }),
    unusedUsername(false),
    fromJS({ unusedUsername: false })
  );

  reducerTest(
    'should update if the e-mail requested is unused',
    registrationPageReducer,
    fromJS({ unusedEmail: true }),
    unusedEmail(false),
    fromJS({ unusedEmail: false })
  );

  reducerTest(
    'should not change the current state',
    registrationPageReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

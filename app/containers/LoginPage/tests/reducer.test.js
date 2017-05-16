import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';
import {
  sendingRequest,
  loginFailed,
} from '../actions';

describe('loginPageReducer', () => {
  reducerTest(
    'should update \'currentlySending\' request flag',
    loginPageReducer,
    fromJS({ currentlySending: false }),
    sendingRequest(true),
    fromJS({ currentlySending: true })
  );

  reducerTest(
    'should update the login error',
    loginPageReducer,
    fromJS({ loginError: undefined }),
    loginFailed('error message'),
    fromJS({ loginError: 'error message' })
  );

  reducerTest(
    'should not change the current state',
    loginPageReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

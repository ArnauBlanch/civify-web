import { reducerTest } from 'redux-jest';
import { fromJS } from 'immutable';
import { authReducer } from '../reducers';
import { loginSuccess } from '../containers/LoginPage/actions';

describe('authReducer test', () => {
  reducerTest(
    'should set \'isAuthenticated\' to true',
    authReducer,
    fromJS({ currentlySending: false }),
    loginSuccess(),
    fromJS({ currentlySending: true })
  );
});

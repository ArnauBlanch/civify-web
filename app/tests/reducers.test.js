import { reducerTest } from 'redux-jest'; // eslint-disable-line
import { fromJS } from 'immutable';
import { authReducer } from '../reducers';
import { loginSuccess, logoutRequest } from '../containers/LoginPage/actions';

describe('authReducer test', () => {
  reducerTest(
    'should set \'isAuthenticated\' to true (LOGIN_SUCCESS)',
    authReducer,
    fromJS({ isAuthenticated: false }),
    loginSuccess(),
    fromJS({ isAuthenticated: true })
  );

  reducerTest(
    'should set \'isAuthenticated\' to false (LOGOUT_REQUEST)',
    authReducer,
    fromJS({ isAuthenticated: true }),
    logoutRequest(),
    fromJS({ isAuthenticated: false })
  );
});

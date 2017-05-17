import { actionTest } from 'redux-jest'; // eslint-disable-line
import {
  loginRequest,
  sendingRequest,
  userInfoRequest,
  userInfoFailed,
  loginSuccess,
  loginFailed,
} from '../actions';

import {
  LOGIN_REQUEST,
  SENDING_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
} from '../constants';

const user = {
  username: 'test username',
  email: 'test@email.com',
  password: 'test password',
};

describe('LoginPage actions', () => {
  actionTest('should create an action to do a login request',
    loginRequest,
    user,
    { type: LOGIN_REQUEST, user }
  );

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to alert that login has failed',
    loginFailed,
    '#EpicFail',
    { type: LOGIN_FAILED, error: '#EpicFail' }
  );

  actionTest('should create an action to alert that login has succeeded',
    loginSuccess,
    null,
    { type: LOGIN_SUCCESS }
  );

  actionTest('should create an action to do a current user info request',
    userInfoRequest,
    null,
    { type: USER_INFO_REQUEST }
  );

  actionTest('should create an action to alert that the current user info request has failed',
    userInfoFailed,
    null,
    { type: USER_INFO_FAILED }
  );
});

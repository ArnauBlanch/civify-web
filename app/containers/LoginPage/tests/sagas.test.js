/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import sha256 from 'js-sha256';
import { push } from 'react-router-redux';
import {
  login as loginSaga,
  userInfo as userInfoSaga,
  root as rootSaga,
} from '../sagas';
import {
  loginRequest,
  sendingRequest,
  userInfoRequest,
  userInfoFailed,
  loginSuccess,
  loginFailed,
} from '../actions';
import request from '../../../utils/request';

const user = {
  username: 'mock username2',
  password: 'mock password2',
};

const userBody = {
  username: user.username,
  password: sha256(user.password),
};

describe('testing login saga', () => {
  afterEach(() => {
    global.localStorage.removeItem('user_token');
    global.localStorage.removeItem('auth_token');
  });
  it('should do nothing if error code is unexpected', () => (
    expectSaga(loginSaga)
    .provide([
      [call(request, '/login', 'POST', userBody, false), {
        status: 300,
      }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(loginRequest(user))
    .run()
  ));

  it('should do nothing if response body is empty', () => (
    expectSaga(loginSaga)
    .provide([
      [call(request, '/login', 'POST', userBody, false), {
        status: 200,
        json: () => ({}),
      }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(loginRequest(user))
    .run()
  ));

  it('should alert that login failed if credentials are invalid', () => (
    expectSaga(loginSaga)
    .provide([
      [call(request, '/login', 'POST', userBody, false), {
        status: 401,
        json: () => ({ message: 'Invalid credentials' }),
      }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(loginRequest(user))
    .run()
  ));

  it('should alert that login failed if user does not exist', () => (
    expectSaga(loginSaga)
    .provide([
      [call(request, '/login', 'POST', userBody, false), {
        status: 404,
        json: () => ({ message: 'User not exists' }),
      }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(loginRequest(user))
    .run()
  ));


  it('should ask for user info if login succeeded', () => (
    expectSaga(loginSaga)
    .provide([
      [call(request, '/login', 'POST', userBody, false), {
        status: 200,
        json: () => ({ auth_token: 'jdsffjhakj htqjk4 kr4 2132fdd' }),
      }],
    ])
    .put(sendingRequest(true))
    .put(userInfoRequest())
    .dispatch(loginRequest(user))
    .run()
  ));
});

describe('testing user info saga', () => {
  afterEach(() => {
    global.localStorage.removeItem('user_token');
    global.localStorage.removeItem('auth_token');
  });
  it('should alert that login failed if an error was thrown', () => (
    expectSaga(userInfoSaga)
    .provide([
      [call(request, '/me', 'GET', undefined, true), throwError(new Error('test error'))],
    ])
    .put(userInfoFailed())
    .put(loginFailed('test error'))
    .dispatch(userInfoRequest())
    .run()
  ));

  it('should alert that login and user info failed if an error was thrown', () => (
    expectSaga(userInfoSaga)
    .provide([
      [call(request, '/me', 'GET', undefined, true), { status: 400 }],
    ])
    .put(userInfoFailed())
    .put(loginFailed('Unknown error'))
    .dispatch(userInfoRequest())
    .run()
  ));

  it('should alert that login failed if user is not an admin or a business', () => (
    expectSaga(userInfoSaga)
    .provide([
      [call(request, '/me', 'GET', undefined, true), {
        status: 200,
        json: () => ({ kind: 'app' }),
      }],
    ])
    .put(loginFailed('Not a business or admin'))
    .dispatch(userInfoRequest())
    .run() && expect(global.localStorage.getItem('auth_token')).toBe(undefined)
  ));

  it('should alert that login succeeded and redirect if user is an admin', () => (
    expectSaga(userInfoSaga)
    .provide([
      [call(request, '/me', 'GET', undefined, true), {
        status: 200,
        json: () => ({ kind: 'admin', user_auth_token: 'test user token' }),
      }],
    ])
    .put(loginSuccess())
    .put(push('/admin'))
    .dispatch(userInfoRequest())
    .run()
  ));

  it('should alert that login succeeded and redirect if user is a business', () => (
    expectSaga(userInfoSaga)
    .provide([
      [call(request, '/me', 'GET', undefined, true), {
        status: 200,
        json: () => ({ kind: 'business', user_auth_token: 'test user token' }),
      }],
    ])
    .put(loginSuccess())
    .put(push('/rewards'))
    .dispatch(userInfoRequest())
    .run()
  ));
});

describe('testing root saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(rootSaga)
    .fork(loginSaga)
    .fork(userInfoSaga)
    .run()
  ));
});

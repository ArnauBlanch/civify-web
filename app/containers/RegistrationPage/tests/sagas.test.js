/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import sha256 from 'js-sha256';
import {
  register as registerSaga,
  checkUnusedUsername as checkUnusedUsernameSaga,
  checkUnusedEmail as checkUnusedEmailSaga,
  registrationPageSaga,
} from '../sagas';
import {
  registerRequest,
  sendingRequest,
  unusedUsername,
  checkUnusedUsername,
  unusedEmail,
  checkUnusedEmail,
} from '../actions';
import { loginRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const user = {
  name: 'mock first_name',
  username: 'mock username',
  email: 'mock email',
  password: 'mock password',
};

const userBody = {
  first_name: user.name,
  username: user.username,
  email: user.email,
  kind: 'business',
  password: sha256(user.password),
  password_confirmation: sha256(user.password),
};

describe('testing register saga', () => {
  it('should dispatch an action alerting that the request is no longer being sent and request login if it is successful', () => (
    expectSaga(registerSaga)
    .provide([
      [call(request, '/users', 'POST', userBody, false), {
        status: 201,
        json: () => ({ message: 'User created' }),
      }],
    ])
    .put(sendingRequest(true))
    .put(loginRequest({ username: user.username, password: user.password }))
    .put(sendingRequest(false))
    .dispatch(registerRequest(user))
    .run()
  ));

  it('should dispatch an action alerting that the request is no longer being sent if there was an unknown error', () => (
    expectSaga(registerSaga)
    .provide([
      [call(request, '/users', 'POST', userBody, false), { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(registerRequest(user))
    .run()
  ));

  it('should dispatch an action alerting that the request is no longer being sent and another with an error if the user was not created', () => (
    expectSaga(registerSaga)
    .provide([
      [call(request, '/users', 'POST', userBody, false), {
        status: 400,
        json: () => ({ message: 'User not created' }),
      }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .dispatch(registerRequest(user))
    .run()
  ));
});

describe('testing check username saga', () => {
  it('should dispatch an action alerting that the username is unused', () => (
    expectSaga(checkUnusedUsernameSaga)
    .provide([
      [call(request, '/users/search', 'POST', { username: 'unusedUsername' }, false), {
        status: 404,
        json: () => ({ message: 'User not exists' }),
      }],
    ])
    .put(unusedUsername(true))
    .dispatch(checkUnusedUsername('unusedUsername'))
    .run()
  ));

  it('should dispatch an action alerting that the username is used', () => (
    expectSaga(checkUnusedUsernameSaga)
    .provide([
      [call(request, '/users/search', 'POST', { username: 'usedUsername' }, false), {
        status: 200,
        json: () => ({ message: 'User exists' }),
      }],
    ])
    .put(unusedUsername(false))
    .dispatch(checkUnusedUsername('usedUsername'))
    .run()
  ));

  it('should not alert of anything if there was an unknown error', () => (
    expectSaga(checkUnusedUsernameSaga)
    .provide([
      [call(request, '/users/search', 'POST', { username: 'usedUsername' }, false), { status: 300 }],
    ])
    .dispatch(checkUnusedUsername('usedUsername'))
    .run()
  ));

  it('should not alert of anything if there was an error with unknown body message', () => (
    expectSaga(checkUnusedUsernameSaga)
    .provide([
      [call(request, '/users/search', 'POST', { username: 'usedUsername' }, false), {
        status: 200,
        json: () => ({ message: 'bad message' }),
      }],
    ])
    .dispatch(checkUnusedUsername('usedUsername'))
    .run()
  ));
});

describe('testing check e-mail saga', () => {
  it('should dispatch an action alerting that the e-mail is unused', () => (
    expectSaga(checkUnusedEmailSaga)
    .provide([
      [call(request, '/users/search', 'POST', { email: 'unused@email.com' }, false), {
        status: 404,
        json: () => ({ message: 'User not exists' }),
      }],
    ])
    .put(unusedEmail(true))
    .dispatch(checkUnusedEmail('unused@email.com'))
    .run()
  ));

  it('should dispatch an action alerting that the e-mail is used', () => (
    expectSaga(checkUnusedEmailSaga)
    .provide([
      [call(request, '/users/search', 'POST', { email: 'used@email.com' }, false), {
        status: 200,
        json: () => ({ message: 'User exists' }),
      }],
    ])
    .put(unusedEmail(false))
    .dispatch(checkUnusedEmail('used@email.com'))
    .run()
  ));

  it('should not alert of anything if there was an unknown error', () => (
    expectSaga(checkUnusedEmailSaga)
    .provide([
      [call(request, '/users/search', 'POST', { email: 'used@email.com' }, false), { status: 300 }],
    ])
    .dispatch(checkUnusedEmail('used@email.com'))
    .run()
  ));

  it('should not alert of anything if there was an error with unknown body message', () => (
    expectSaga(checkUnusedEmailSaga)
    .provide([
      [call(request, '/users/search', 'POST', { email: 'used@email.com' }, false), {
        status: 404,
        json: () => ({ message: 'bad message' }),
      }],
    ])
    .dispatch(checkUnusedEmail('used@email.com'))
    .run()
  ));
});

describe('testing root saga', () => {
  it('should fork all internal sagas', () => (
    expectSaga(registrationPageSaga)
    .fork(registerSaga)
    .fork(checkUnusedUsernameSaga)
    .fork(checkUnusedEmailSaga)
    .run()
  ));
});

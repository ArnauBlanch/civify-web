/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import sha256 from 'js-sha256';
import { resetPassword, resetPasswordSaga } from '../sagas';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../actions';
import request from '../../../utils/request';

const token = '1234';
const email = 'test@civify.cf';
const user = {
  password: 'mock password',
  password_confirmation: 'mock password',
};

const userBody = {
  password: sha256(user.password),
  password_confirmation: sha256(user.password_confirmation),
};

describe('testing resetPasswordSaga', () => {
  it('should alert that the request was successful', () => (
    expectSaga(resetPassword)
    .provide([
      [call(request, `/password_resets/${token}`, 'PATCH', { email, user: userBody }, false), {
        status: 200,
      }],
    ])
    .put(resetPasswordSuccess())
    .dispatch(resetPasswordRequest(token, email, user))
    .run()
  ));

  it('should alert that the request failed (unknown error)', () => (
    expectSaga(resetPassword)
    .provide([
      [call(request, `/password_resets/${token}`, 'PATCH', { email, user: userBody }, false), {
        status: 500,
      }],
    ])
    .put(resetPasswordFailure('other'))
    .dispatch(resetPasswordRequest(token, email, user))
    .run()
  ));

  it('should alert that the request failed (e-mail not found)', () => (
    expectSaga(resetPassword)
    .provide([
      [call(request, `/password_resets/${token}`, 'PATCH', { email, user: userBody }, false), {
        status: 404,
      }],
    ])
    .put(resetPasswordFailure('notFound'))
    .dispatch(resetPasswordRequest(token, email, user))
    .run()
  ));

  it('should alert that the request failed (invalid token)', () => (
    expectSaga(resetPassword)
    .provide([
      [call(request, `/password_resets/${token}`, 'PATCH', { email, user: userBody }, false), {
        status: 400,
      }],
    ])
    .put(resetPasswordFailure('invalidToken'))
    .dispatch(resetPasswordRequest(token, email, user))
    .run()
  ));

  it('should alert that the request failed (link expired)', () => (
    expectSaga(resetPassword)
    .provide([
      [call(request, `/password_resets/${token}`, 'PATCH', { email, user: userBody }, false), {
        status: 401,
      }],
    ])
    .put(resetPasswordFailure('expired'))
    .dispatch(resetPasswordRequest(token, email, user))
    .run()
  ));
});

describe('testing root saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(resetPasswordSaga)
    .fork(resetPassword)
    .run()
  ));
});

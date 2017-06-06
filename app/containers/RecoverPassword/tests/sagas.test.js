/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { recoverPassword, recoverPasswordSaga } from '../sagas';
import {
  recoverPasswordRequest,
  recoverPasswordSuccess,
  recoverPasswordFailure
} from '../actions';
import request from '../../../utils/request';

const email = 'test@civify.cf';

describe('testing recoverPasswordSaga', () => {
  it('should alert that the request was successful', () => (
    expectSaga(recoverPassword)
    .provide([
      [call(request, '/password_resets', 'POST', { email }, false), {
        status: 200,
      }],
    ])
    .put(recoverPasswordSuccess())
    .dispatch(recoverPasswordRequest(email))
    .run()
  ));

  it('should alert that the request failed', () => (
    expectSaga(recoverPassword)
    .provide([
      [call(request, '/password_resets', 'POST', { email }, false), {
        status: 400,
      }],
    ])
    .put(recoverPasswordFailure(false))
    .dispatch(recoverPasswordRequest(email))
    .run()
  ));

  it('should alert that the request failed because the user does not exist', () => (
    expectSaga(recoverPassword)
    .provide([
      [call(request, '/password_resets', 'POST', { email }, false), {
        status: 404,
      }],
    ])
    .put(recoverPasswordFailure(true))
    .dispatch(recoverPasswordRequest(email))
    .run()
  ));
});

/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'react-router-redux';
import {
  validateReward,
  rewardValidationSaga,
} from '../sagas';
import {
  validateRequest,
  rewardAlreadyUsed,
  rewardValidated,
  rewardInvalid,
  validateError,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const code = 'TEST CODE';
const validateBody = { exchange_auth_token: code };

describe('testing ValidateRewardsPage saga', () => {
  it('should dispatch an action notifying that the reward code was validated', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), { status: 200 }],
    ])
    .put(rewardValidated())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying that the reward is already used', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), {
        status: 401,
        json: () => ({ message: 'User has already used this buyed award' }),
      }],
    ])
    .put(rewardAlreadyUsed())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying that the code is invalid if it does not belong to the business', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), {
        status: 401,
        json: () => ({ message: 'This award doesn’t belong to this commerce' }),
      }],
    ])
    .put(rewardInvalid())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying that the code is invalid if it does not exist', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), { status: 404 }],
    ])
    .put(rewardInvalid())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying an error if the error returned is unknown', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), { status: 600 }],
    ])
    .put(validateError())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying an error if the error returned is 401 with unknown message', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), {
        status: 401,
        json: () => ({ message: '#epicFail' }),
      }],
    ])
    .put(validateError())
    .dispatch(validateRequest(code))
    .run()
  ));

  it('should dispatch an action notifying an error if there is no auth_token', () => (
    expectSaga(validateReward)
    .provide([
      [call(request, '/use', 'POST', validateBody, true), throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(validateError())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(validateRequest(code))
    .run()
  ));
});

describe('testing root saga', () => {
  it('should fork all internal sagas', () => (
    expectSaga(rewardValidationSaga)
    .fork(validateReward)
    .run()
  ));
});

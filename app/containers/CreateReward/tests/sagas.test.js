/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import {
  createReward as createRewardSaga,
  defaultSaga,
} from '../sagas';
import {
  createRewardRequest,
  createRewardFailed,
  createRewardSuccess,
  sendingRequest,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const reward = {
  title: 'title',
  description: 'description',
  price: 100,
  image: {
    filename: 'test.jpg',
    content_type: 'image/jpeg',
    content: 'fdsfsadfsafasd',
  },
};

describe('testing createReward saga', () => {
  beforeEach(() => global.localStorage.setItem('user_token', 'userTokenTest'));

  it('should alert that the request is no longer being sent and that if succeeded sent if the reward was created', () => (
    expectSaga(createRewardSaga)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'POST', reward, true),
      { status: 201 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createRewardSuccess())
    .put(push('/rewards'))
    .dispatch(createRewardRequest(reward))
    .run()
  ));

  it('should logout and redirect to login if there is not user_token in localStorage', () => {
    global.localStorage.removeItem('user_token');
    return expectSaga(createRewardSaga)
    .put(createRewardFailed())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createRewardRequest(reward))
    .run();
  });

  it('should alert that there was an error if there was a bad request', () => (
    expectSaga(createRewardSaga)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'POST', reward, true),
      { status: 400 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createRewardFailed())
    .dispatch(createRewardRequest(reward))
    .run()
  ));

  it('should alert that there was an error if the user does not exist', () => (
    expectSaga(createRewardSaga)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'POST', reward, true),
      { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createRewardFailed())
    .dispatch(createRewardRequest(reward))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error', () => (
    expectSaga(createRewardSaga)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'POST', reward, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createRewardFailed())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createRewardRequest(reward))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage', () => (
    expectSaga(createRewardSaga)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'POST', reward, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createRewardFailed())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createRewardRequest(reward))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(defaultSaga)
    .fork(createRewardSaga)
    .run()
  ));
});

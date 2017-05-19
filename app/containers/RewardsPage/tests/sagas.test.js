/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'react-router-redux';
import {
  getRewards,
  rewardsPageSaga,
  deleteRewardSaga,
} from '../sagas';
import {
  getRewardsRequest,
  getRewardsSuccess,
  getRewardsFailed,
  deleteRewardRequest,
  deleteRewardSuccess,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const rewards = [{ id: 1 }, { id: 2 }];

describe('testing RewardsPage saga', () => {
  beforeEach(() => global.localStorage.setItem('user_token', 'userTokenTest'));

  it('should dispatch an action alerting that the request suceeded with the rewards fetched', () => (
    expectSaga(getRewards)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'GET', undefined, true), {
        status: 200,
        json: () => rewards,
      }],
    ])
    .put(getRewardsSuccess(rewards))
    .dispatch(getRewardsRequest())
    .run()
  ));

  it('should dispatch an action alerting that the request failed when there is an unknown error', () => (
    expectSaga(getRewards)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'GET', undefined, true), {
        status: 400,
        json: () => rewards,
      }],
    ])
    .put(getRewardsFailed())
    .dispatch(getRewardsRequest())
    .run()
  ));

  it('should dispatch an action alerting that the request failed and redirect to login when there is an authentication error (401)', () => (
    expectSaga(getRewards)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'GET', undefined, true), {
        status: 401,
        json: () => rewards,
      }],
    ])
    .put(getRewardsFailed())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getRewardsRequest())
    .run()
  ));

  it('should dispatch an action alerting that the request failed and redirect to login when there is an authentication error (no auth_token)', () => (
    expectSaga(getRewards)
    .provide([
      [call(request, '/users/userTokenTest/offered_awards', 'GET', undefined, true), {
        status: 401,
        json: () => rewards,
      }],
    ])
    .put(getRewardsFailed())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getRewardsRequest())
    .run()
  ));

  it('should dispatch an action to alert that the reward has been deleted', () => (
    expectSaga(deleteRewardSaga)
    .provide([
      [call(request, '/awards/test1234', 'DELETE', undefined, true), {
        status: 204,
        json: () => rewards,
      }],
    ])
    .put(deleteRewardSuccess())
    .put(getRewardsRequest())
    .put(push('/rewards'))
    .dispatch(deleteRewardRequest('test1234'))
    .run()
  ));
});

describe('testing root saga', () => {
  it('should fork all internal sagas', () => (
    expectSaga(rewardsPageSaga)
    .fork(getRewards)
    .fork(deleteRewardSaga)
    .run()
  ));
});

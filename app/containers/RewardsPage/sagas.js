import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_REWARDS_REQUEST, DELETE_REWARD_REQUEST } from './constants';
import { getRewardsRequest, getRewardsSuccess, getRewardsFailed, deleteRewardSuccess } from './actions';
import { logoutRequest } from '../LoginPage/actions';
import request from '../../utils/request';

export function* getRewards() {
  while (true) { // eslint-disable-line
    yield take(GET_REWARDS_REQUEST);
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      yield put(getRewardsFailed());
      yield put(logoutRequest());
      yield put(push('/login'));
    } else {
      const url = `/users/${userToken}/offered_awards`;
      try {
        const response = yield call(request, url, 'GET', undefined, true);
        if (response.status === 200) {
          const body = yield response.json();
          yield put(getRewardsSuccess(body));
        } else {
          yield put(getRewardsFailed());
          if (response.status === 401) {
            yield put(logoutRequest());
            yield put(push('/login'));
          }
        }
      } catch (e) {
        yield put(getRewardsFailed());
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    }
  }
}

export function* deleteRewardSaga() {
  while (true) { // eslint-disable-line
    const { rewardID } = yield take(DELETE_REWARD_REQUEST);
    const url = `/awards/${rewardID}`;
    try {
      const response = yield call(request, url, 'DELETE', undefined, true);
      if (response.status === 204) {
        yield put(deleteRewardSuccess());
        yield put(push('/rewards'));
        yield put(getRewardsRequest());
      } else if (response.status === 401) {
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    } catch (e) {
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export function* rewardsPageSaga() {
  yield fork(getRewards);
  yield fork(deleteRewardSaga);
}

// All sagas to be loaded
export default [
  rewardsPageSaga,
];

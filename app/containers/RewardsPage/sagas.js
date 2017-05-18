import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_REWARDS_REQUEST } from './constants';
import { getRewardsSuccess, getRewardsFailed } from './actions';
import { logoutRequest } from '../LoginPage/actions';
import request from '../../utils/request';

export function* getRewards() {
  while (true) {
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
          console.log(body);
          yield put(getRewardsSuccess(body));
          yield put(push('/rewards'));
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

// Individual exports for testing
export function* rewardsPageSaga() {
  yield fork(getRewards);
}

// All sagas to be loaded
export default [
  rewardsPageSaga,
];

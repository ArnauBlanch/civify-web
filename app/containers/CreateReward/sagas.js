import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_REWARD_REQUEST } from './constants';
import request from '../../utils/request';
import { sendingRequest, createRewardSuccess, createRewardFailed } from './actions';
import { logoutRequest } from '../LoginPage/actions';

export function* createReward() {
  while (true) { // eslint-disable-line
    const { reward } = yield take(CREATE_REWARD_REQUEST);
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      yield put(createRewardFailed());
      yield put(logoutRequest());
      yield put(push('/login'));
    } else {
      yield put(sendingRequest(true));
      const url = `/users/${userToken}/offered_awards`;
      try {
        const response = yield call(request, url, 'POST', reward, true);
        if (response.status === 201) {
          yield put(sendingRequest(false));
          yield put(createRewardSuccess());
          yield put(push('/rewards'));
        } else {
          yield put(sendingRequest(false));
          yield put(createRewardFailed());
          if (response.status === 401) {
            yield put(logoutRequest());
            yield put(push('/login'));
          }
        }
      } catch (e) {
        yield put(sendingRequest(false));
        yield put(createRewardFailed());
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    }
  }
}

// Individual exports for testing
export function* createRewardSaga() {
  yield fork(createReward);
}

// All sagas to be loaded
export default [
  createRewardSaga,
];

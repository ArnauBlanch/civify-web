import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_ACHIEVEMENT_REQUEST } from './constants';
import request from '../../utils/request';
import { sendingRequest, createAchievementSuccess, createAchievementFailure } from './actions';
import { logoutRequest } from '../LoginPage/actions';

export function* createAchievement() {
  while (true) { // eslint-disable-line
    const { achievement } = yield take(CREATE_ACHIEVEMENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, '/achievements', 'POST', achievement, true);
      yield put(sendingRequest(false));
      if (response.status === 201) {
        yield put(createAchievementSuccess());
        yield put(push('/achievements'));
      } else {
        if (response.status === 400) {
          const body = yield response.json();
          if (body.message === 'Already exists') {
            yield put(createAchievementFailure(true));
          } else {
            yield put(createAchievementFailure(false));
          }
        } else {
          yield put(createAchievementFailure(false));
        }
        if (response.status === 401) {
          yield put(logoutRequest());
          yield put(push('/login'));
        }
      }
    } catch (e) {
      console.log(e);
      yield put(sendingRequest(false));
      yield put(createAchievementFailure(false));
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export function* createAchievementSaga() {
  yield fork(createAchievement);
}

// All sagas to be loaded
export default [
  createAchievementSaga,
];

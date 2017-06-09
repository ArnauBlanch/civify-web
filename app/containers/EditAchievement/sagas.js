import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ACHIEVEMENT_REQUEST, EDIT_ACHIEVEMENT_REQUEST } from './constants';
import request from '../../utils/request';
import {
  sendingRequest,
  getAchievementSuccess,
  getAchievementFailure,
  editAchievementSuccess,
  editAchievementFailure,
} from './actions';
import { getAchievementsRequest } from '../AchievementsPage/actions';
import { logoutRequest } from '../LoginPage/actions';

export function* getAchievement() {
  while (true) { // eslint-disable-line
    const { achievementID } = yield take(GET_ACHIEVEMENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, `/achievements/${achievementID}`, 'GET', undefined, true);
      yield put(sendingRequest(false));
      if (response.status === 200) {
        const body = yield response.json();
        yield put(getAchievementSuccess(body));
      } else {
        yield put(getAchievementFailure());
        if (response.status === 404) {
          yield put(push('/achievement-not-found'));
        }
        if (response.status === 401) {
          yield put(logoutRequest());
          yield put(push('/login'));
        }
      }
    } catch (e) {
      yield put(sendingRequest(false));
      yield put(getAchievementFailure());
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

export function* editAchievement() {
  while (true) { // eslint-disable-line
    const { achievementID, newValues, isEditing } = yield take(EDIT_ACHIEVEMENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, `/achievements/${achievementID}`, 'PATCH', newValues, true);
      yield put(sendingRequest(false));
      if (response.status === 200) {
        yield put(editAchievementSuccess());
        if (isEditing) {
          yield put(push('/achievements'));
        } else {
          yield put(getAchievementsRequest());
        }
      } else if (response.status === 404) {
        yield put(editAchievementFailure(false));
        yield put(push('/achievement-not-found'));
      } else if (response.status === 400) {
        const body = yield response.json();
        if (body.message === 'Number has already been taken') {
          yield put(editAchievementFailure(true));
        } else {
          yield put(editAchievementFailure(false));
        }
      } else if (response.status === 401) {
        yield put(editAchievementFailure(false));
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    } catch (e) {
      yield put(sendingRequest(false));
      yield put(editAchievementFailure(false));
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export function* editAchievementSaga() {
  yield fork(getAchievement);
  yield fork(editAchievement);
}

// All sagas to be loaded
export default [
  editAchievementSaga,
];

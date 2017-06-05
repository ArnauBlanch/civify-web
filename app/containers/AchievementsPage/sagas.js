import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ACHIEVEMENTS_REQUEST } from './constants';
import request from '../../utils/request';
import { currentlySending, getAchievementsSuccess, getAchievementsFailure } from './actions';
import { logoutRequest } from '../LoginPage/actions';

export function* getAchievements() {
  while (true) { // eslint-disable-line
    const { enabled } = yield take(GET_ACHIEVEMENTS_REQUEST);
    let url = '/achievements';
    if (typeof enabled !== 'undefined') {
      url = `${url}?enabled=${enabled ? 'true' : 'false'}`;
    }
    try {
      yield put(currentlySending(true));
      const response = yield call(request, url, 'GET', undefined, true);
      yield put(currentlySending(false));
      if (response.status === 200) {
        const body = yield response.json();
        yield put(getAchievementsSuccess(body));
      } else if (response.status === 401) {
        yield put(getAchievementsFailure());
      }
    } catch (e) {
      yield put(getAchievementsFailure());
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

export function* achievementsSaga() {
  yield fork(getAchievements);
}

// All sagas to be loaded
export default [
  achievementsSaga,
];

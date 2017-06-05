import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_EVENTS_REQUEST } from './constants';
import request from '../../utils/request';
import { currentlySending, getEventsSuccess, getEventsFailure } from './actions';
import { logoutRequest } from '../LoginPage/actions';

export function* getEvents() {
  while (true) { // eslint-disable-line
    const { enabled } = yield take(GET_EVENTS_REQUEST);
    let url = '/events';
    if (typeof enabled !== 'undefined') {
      url = `${url}?enabled=${enabled ? 'true' : 'false'}`;
    }
    try {
      yield put(currentlySending(true));
      const response = yield call(request, url, 'GET', undefined, true);
      yield put(currentlySending(false));
      if (response.status === 200) {
        const body = yield response.json();
        yield put(getEventsSuccess(body));
      } else if (response.status === 401) {
        yield put(getEventsFailure());
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    } catch (e) {
      yield put(currentlySending(false));
      yield put(getEventsFailure());
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

export function* eventsSaga() {
  yield fork(getEvents);
}

// All sagas to be loaded
export default [
  eventsSaga,
];

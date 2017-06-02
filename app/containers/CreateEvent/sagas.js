import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_EVENT_REQUEST } from './constants';
import request from '../../utils/request';
import { sendingRequest, createEventSuccess, createEventFailure } from './actions';
import { logoutRequest } from '../LoginPage/actions';

export function* createEvent() {
  while (true) { // eslint-disable-line
    const { event } = yield take(CREATE_EVENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, '/events', 'POST', event, true);
      yield put(sendingRequest(false));
      if (response.status === 201) {
        yield put(createEventSuccess());
        yield put(push('/events'));
      } else {
        if (response.status === 400) {
          const body = yield response.json();
          if (body.message === 'Number has already been taken') {
            yield put(createEventFailure(true, false));
          } else if (body.message.startsWith('End date must be after or equal to')) {
            yield put(createEventFailure(false, true));
          } else {
            yield put(createEventFailure(false, false));
          }
        } else {
          yield put(createEventFailure(false, false));
        }
        if (response.status === 401) {
          yield put(logoutRequest());
          yield put(push('/login'));
        }
      }
    } catch (e) {
      yield put(sendingRequest(false));
      yield put(createEventFailure(false, false));
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export function* createEventSaga() {
  yield fork(createEvent);
}

// All sagas to be loaded
export default [
  createEventSaga,
];

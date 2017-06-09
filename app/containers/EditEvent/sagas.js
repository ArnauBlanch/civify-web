import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_EVENT_REQUEST, EDIT_EVENT_REQUEST } from './constants';
import request from '../../utils/request';
import {
  sendingRequest,
  getEventSuccess,
  getEventFailure,
  editEventSuccess,
  editEventFailure,
} from './actions';
import { getEventsRequest } from '../EventsPage/actions';
import { logoutRequest } from '../LoginPage/actions';

export function* getEvent() {
  while (true) { // eslint-disable-line
    const { eventID } = yield take(GET_EVENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, `/events/${eventID}`, 'GET', undefined, true);
      yield put(sendingRequest(false));
      if (response.status === 200) {
        const body = yield response.json();
        yield put(getEventSuccess(body));
      } else {
        yield put(getEventFailure());
        if (response.status === 404) {
          yield put(push('/event-not-found'));
        } else if (response.status === 401) {
          yield put(logoutRequest());
          yield put(push('/login'));
        }
      }
    } catch (e) {
      yield put(sendingRequest(false));
      yield put(getEventFailure());
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

export function* editEvent() {
  while (true) { // eslint-disable-line
    const { eventID, newValues, isEditing } = yield take(EDIT_EVENT_REQUEST);
    try {
      yield put(sendingRequest(true));
      const response = yield call(request, `/events/${eventID}`, 'PATCH', newValues, true);
      yield put(sendingRequest(false));
      if (response.status === 200) {
        yield put(editEventSuccess());
        if (isEditing) {
          yield put(push('/events'));
        } else {
          yield put(getEventsRequest());
        }
      } else if (response.status === 404) {
        yield put(editEventFailure(false, false));
        yield put(push('/event-not-found'));
      } else if (response.status === 400) {
        const body = yield response.json();
        if (body.message === 'Number has already been taken') {
          yield put(editEventFailure(true, false));
        } else if (body.message.startsWith('End date must be after or equal to')) {
          yield put(editEventFailure(false, true));
        } else {
          yield put(editEventFailure(false, false));
        }
      } else if (response.status === 401) {
        yield put(editEventFailure(false, false));
        yield put(logoutRequest());
        yield put(push('/login'));
      }
    } catch (e) {
      yield put(sendingRequest(false));
      yield put(editEventFailure(false, false));
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export function* editEventSaga() {
  yield fork(getEvent);
  yield fork(editEvent);
}

// All sagas to be loaded
export default [
  editEventSaga,
];

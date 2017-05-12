import { take, call, put, fork } from 'redux-saga/effects';
import sha256 from 'js-sha256';
import { browserHistory } from 'react-router';
import { REGISTER_REQUEST, CHECK_UNUSED_USERNAME, CHECK_UNUSED_EMAIL } from './constants';
import { sendingRequest, requestError, unusedUsername, unusedEmail } from './actions';
import request from '../../utils/request';

// Individual exports for testing
export function* register() {
  while (true) {
    const registrationRequest = yield take(REGISTER_REQUEST);
    const { data } = registrationRequest;
    const user = {
      first_name: data.name,
      username: data.username,
      email: data.email,
      kind: 'business',
      password: sha256(data.password),
      password_confirmation: sha256(data.password),
    };

    yield put(sendingRequest(true));

    try {
      const wasSuccesful =
      yield call(request, '/users', 'POST', user, false);
      if (wasSuccesful) {
        browserHistory.push('/');
      }
    } catch (error) {
      yield put(requestError(error.message));
    } finally {
      yield put(sendingRequest(false));
    }
  }
}

export function* checkUnusedUsername() {
  while (true) {
    const unusedRequest = yield take(CHECK_UNUSED_USERNAME);
    const { username } = unusedRequest;

    try {
      if (yield call(request, '/users/search', 'POST', { username }, false)) {
        yield put(unusedUsername(true));
      }
    } catch (error) {
      yield put(unusedUsername(false));
    }
  }
}

export function* checkUnusedEmail() {
  while (true) {
    const unusedRequest = yield take(CHECK_UNUSED_EMAIL);
    const { email } = unusedRequest;

    try {
      if (yield call(request, '/users/search', 'POST', { email }, false)) {
        yield put(unusedEmail(true));
      }
    } catch (error) {
      yield put(unusedEmail(false));
    }
  }
}

export function* root() {
  yield fork(register);
  yield fork(checkUnusedUsername);
  yield fork(checkUnusedEmail);
}

export default [
  root,
];

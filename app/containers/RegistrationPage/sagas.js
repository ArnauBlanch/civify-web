import { take, call, put, fork } from 'redux-saga/effects';
import sha256 from 'js-sha256';
import { push } from 'react-router-redux';
import { REGISTER_REQUEST, CHECK_UNUSED_USERNAME, CHECK_UNUSED_EMAIL } from './constants';
import { sendingRequest, unusedUsername, unusedEmail } from './actions';
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
    const response = yield call(request, '/users', 'POST', user, false);
    if (response.status === 201 || response.status === 400) {
      const body = yield response.json();
      if (response.status === 201 && body.message === 'User created') {
        yield put(push('/'));
      }
    }
    yield put(sendingRequest(false));
  }
}

export function* checkUnusedUsername() {
  while (true) {
    const unusedRequest = yield take(CHECK_UNUSED_USERNAME);
    const { username } = unusedRequest;
    const response = yield call(request, '/users/search', 'POST', { username }, false);

    if (response.status === 200 || response.status === 404) {
      const body = yield response.json();
      if (response.status === 200 && body.message === 'User exists') {
        yield put(unusedUsername(false));
      } else if (response.status === 404 && body.message === 'User not exists') {
        yield put(unusedUsername(true));
      }
    }
  }
}

export function* checkUnusedEmail() {
  while (true) {
    const unusedRequest = yield take(CHECK_UNUSED_EMAIL);
    const { email } = unusedRequest;
    const response = yield call(request, '/users/search', 'POST', { email }, false);
    if (response.status === 200 || response.status === 404) {
      const body = yield response.json();
      if (response.status === 200 && body.message === 'User exists') {
        yield put(unusedEmail(false));
      } else if (response.status === 404 && body.message === 'User not exists') {
        yield put(unusedEmail(true));
      }
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

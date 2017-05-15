import { take, call, put, fork } from 'redux-saga/effects';
import sha256 from 'js-sha256';
import { push } from 'react-router-redux';
import { LOGIN_REQUEST, USER_INFO_REQUEST } from './constants';
import { sendingRequest, userInfoRequest, userInfoFailed, loginSuccess, loginFailed } from './actions';
import request from '../../utils/request';

export function* userInfo() {
  while (true) {
    yield take(USER_INFO_REQUEST);
    try {
      const response = yield call(request, '/me', 'GET', undefined, true);
      const body = yield response.json();
      if (response.status === 200) {
        if (body.kind === 'business' || body.kind === 'admin') {
          localStorage.setItem('user_token', body.user_auth_token);
          if (body.kind === 'business') {
            yield put(push('/')); // change
          } else {
            yield put(push('/')); // change
          }
          yield put(loginSuccess());
        } else {
          localStorage.removeItem('auth_token');
          yield put(loginFailed('Not a business or admin'));
        }
      } else {
        yield put(userInfoFailed());
        yield put(loginFailed(body.message));
      }
    } catch (error) {
      yield put(loginFailed(error.message));
    }
  }
}

export function* login() {
  while (true) {
    const loginRequest = yield take(LOGIN_REQUEST);
    const { user } = loginRequest;
    user.password = sha256(user.password);

    yield put(sendingRequest(true));
    const response = yield call(request, '/login', 'POST', user, false);
    if (response.status === 200 || response.status === 401 || response.status === 404) {
      const body = yield response.json();
      if (response.status === 200 && body.auth_token) {
        localStorage.setItem('auth_token', body.auth_token);
        yield put(userInfoRequest());
      } else if ((response.status === 401 && body.message === 'Invalid credentials')
        || (response.status === 404 && body.message === 'User not exists')) {
        yield put(loginFailed(body.message));
      }
    }
    yield put(sendingRequest(false));
  }
}

export function* root() {
  yield fork(login);
  yield fork(userInfo);
}

// All sagas to be loaded
export default [
  root,
];

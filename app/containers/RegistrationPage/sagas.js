import { take, call, put, fork } from 'redux-saga/effects';
import sha256 from 'js-sha256';
import { browserHistory } from 'react-router';
import { REGISTER_REQUEST } from './constants';
import { sendingRequest, requestError } from './actions';
import request from '../../utils/request';

// Individual exports for testing
export function* register() {
  while (true) {
    console.log('HELLO');
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
    const bodyJSON = JSON.stringify(user);

    yield put(sendingRequest(true));

    try {
      const wasSuccesful =
      yield call(request, 'http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Length': bodyJSON.length.toString,
        },
        body: bodyJSON.toString(),
      });
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

export function* root() {
  yield fork(register);
}

export default [
  root,
];

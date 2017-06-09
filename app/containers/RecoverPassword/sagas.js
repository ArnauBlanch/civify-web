import { take, call, put, fork } from 'redux-saga/effects';
import { RECOVER_PASSWORD_REQUEST } from './constants';
import { recoverPasswordSuccess, recoverPasswordFailure } from './actions';
import request from '../../utils/request';

export function* recoverPassword() {
  while (true) { // eslint-disable-line
    const { email } = yield take(RECOVER_PASSWORD_REQUEST);
    const response = yield call(request, '/password_resets', 'POST', { email }, false);
    if (response.status === 200) {
      yield put(recoverPasswordSuccess());
    } else if (response.status === 404) {
      yield put(recoverPasswordFailure(true));
    } else {
      yield put(recoverPasswordFailure(false));
    }
  }
}

export function* recoverPasswordSaga() {
  yield fork(recoverPassword);
}

export default [
  recoverPasswordSaga,
];

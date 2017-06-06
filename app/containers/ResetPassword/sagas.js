import { take, call, put, fork } from 'redux-saga/effects';
import sha256 from 'js-sha256';
import { RESET_PASSWORD_REQUEST } from './constants';
import { resetPasswordSuccess, resetPasswordFailure } from './actions';
import request from '../../utils/request';

export function* resetPassword() {
  while (true) { // eslint-disable-line
    const { token, email, requestBody } = yield take(RESET_PASSWORD_REQUEST);
    const body = {
      email,
      user: {
        password: sha256(requestBody.password),
        password_confirmation: sha256(requestBody.password_confirmation),
      },
    };
    const response = yield call(request, `/password_resets/${token}`, 'PATCH', body, false);
    if (response.status === 200) {
      yield put(resetPasswordSuccess());
    } else if (response.status === 404) {
      yield put(resetPasswordFailure('notFound'));
    } else if (response.status === 400) {
      yield put(resetPasswordFailure('invalidToken'));
    } else if (response.status === 401) {
      yield put(resetPasswordFailure('expired'));
    } else {
      yield put(resetPasswordFailure('other'));
    }
  }
}

export function* resetPasswordSaga() {
  yield fork(resetPassword);
}

export default [
  resetPasswordSaga,
];

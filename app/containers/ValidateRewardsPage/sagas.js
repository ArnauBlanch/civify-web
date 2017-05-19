import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { VALIDATE_REQUEST } from './constants';
import {
  rewardAlreadyUsed,
  rewardValidated,
  rewardInvalid,
  validateError,
} from './actions';
import { logoutRequest } from '../LoginPage/actions';
import request from '../../utils/request';

export function* validateReward() {
  while (true) { // eslint-disable-line
    const { code } = yield take(VALIDATE_REQUEST);
    try {
      const validateBody = { exchange_auth_token: code };
      const response = yield call(request, '/use', 'POST', validateBody, true);
      if (response.status === 200) {
        yield put(rewardValidated());
      } else if (response.status === 401) {
        const body = yield response.json();
        if (body.message === 'User has already used this buyed award') {
          yield put(rewardAlreadyUsed());
        } else if (body.message === 'This award doesn\'t belong to this commerce') {
          yield put(rewardInvalid());
        } else {
          yield put(validateError());
          yield put(logoutRequest());
          yield put(push('/login'));
        }
      } else if (response.status === 404) {
        yield put(rewardInvalid());
      } else {
        yield put(validateError());
      }
    } catch (e) {
      yield put(validateError());
      yield put(logoutRequest());
      yield put(push('/login'));
    }
  }
}


export function* rewardValidationSaga() {
  yield fork(validateReward);
}

export default [
  rewardValidationSaga,
];

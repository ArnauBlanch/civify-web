import { take, call, fork, put } from 'redux-saga/effects';
import {
  ISSUES_REQUEST,
} from './constants';
import {
  issuesInfoSuccess,
} from './actions';
import request from '../../utils/request';

export function* issuesRequest() {
  while (true) {
    yield take(ISSUES_REQUEST);
    const response = yield call(request, '/issues', 'GET', undefined, false);
    if (response.status === 200) {
      const body = yield response.json();
      yield put(issuesInfoSuccess(body));
    } else { // error retrieving issues
      console.log('error retrieving the issues');
    }
  }
}

export function* defaultSaga() {
  yield fork(issuesRequest);
}

// All sagas to be loaded
export default [
  defaultSaga,
];

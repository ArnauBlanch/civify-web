import { take, call, fork, put } from 'redux-saga/effects';
import {
  ISSUES_REQUEST,
} from './constants';
import {
  issuesInfoSuccess,
} from './actions';
import request from '../../utils/request';

export function* issuesRequest() {
  while (true) { // eslint-disable-line
    const { filters } = yield take(ISSUES_REQUEST);
    let filtersQuery = Object.keys(filters).length > 0 ? '?' : '';
    Object.keys(filters).forEach((key, index) => {
      filtersQuery += index > 0 ? '&' : '';
      const value = filters[key];
      if (key === 'categories') {
        value.forEach((c, cIndex) => {
          filtersQuery += cIndex > 0 ? '&' : '';
          filtersQuery += `categories[]=${c}`;
        });
      } else {
        filtersQuery += `${key}=${value}`;
      }
    });
    const response = yield call(request, `/issues${filtersQuery}`, 'GET', undefined, false);
    if (response.status === 200) {
      const body = yield response.json();
      yield put(issuesInfoSuccess(body));
    }
  }
}

export function* mapSaga() {
  yield fork(issuesRequest);
}

// All sagas to be loaded
export default [
  mapSaga,
];

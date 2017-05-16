import { take, call, put, select } from 'redux-saga/effects';
import {
  ISSUES_REQUEST,
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

export function* login() {
  while (true) {
    yield take(ISSUES_REQUEST);
    try {
      // hello
    } catch (error) {
      // error catch
    }
    // yield put(sendingRequest(false));
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];

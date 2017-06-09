/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../sagas';

// const generator = defaultSaga();

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan'; // eslint-disable-line
import {
  issuesRequest as issuesRequestSaga,
  mapSaga,
} from '../sagas';
import {
  issuesRequest,
  issuesInfoSuccess,
} from '../actions';
import request from '../../../utils/request';

describe('test map page saga', () => {
  it('should dispatch an action when issues are loaded correctly (no filters)', () => (
    expectSaga(issuesRequestSaga)
    .provide([
      [call(request, '/issues', 'GET', undefined, false), {
        status: 200,
        json: () => ([{}, {}]),
      }],
    ])
    .put(issuesInfoSuccess([{}, {}]))
    .dispatch(issuesRequest({}))
    .run()
  ));

  it('should dispatch an action when issues are loaded correctly (with filters)', () => (
    expectSaga(issuesRequestSaga)
    .provide([
      [call(request, '/issues?test1=true&test2=100&test3=string&categories[]=cat1&categories[]=cat2', 'GET', undefined, false), {
        status: 200,
        json: () => ([{}, {}]),
      }],
    ])
    .put(issuesInfoSuccess([{}, {}]))
    .dispatch(issuesRequest({ test1: true, test2: 100, test3: 'string', categories: ['cat1', 'cat2'] }))
    .run()
  ));

  it('should dispatch an action when issues are NOT loaded correctly', () => (
    expectSaga(issuesRequestSaga)
    .provide([
      [call(request, '/issues', 'GET', undefined, false), {
        status: 500,
        json: () => ({ message: 'Error loading the issues' }),
      }],
    ])
    .dispatch(issuesRequest({}))
    .run()
  ));
});

describe('testing map saga', () => {
  it('should fork all internal sagas', () => (
    expectSaga(mapSaga)
    .fork(issuesRequestSaga)
    .run()
  ));
});

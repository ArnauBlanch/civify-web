/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import { getEvents, eventsSaga } from '../sagas';
import {
  getEventsRequest,
  getEventsFailure,
  getEventsSuccess,
  currentlySending,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const events = [{ id: 1 }, { id: 2 }];

describe('EventsPage Saga', () => {
  it('should alert that the request is no longer being sent and that it succeeded', () => (
    expectSaga(getEvents)
    .provide([
      [call(request, '/events', 'GET', undefined, true),
      { status: 200, json: () => events }],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getEventsSuccess(events))
    .dispatch(getEventsRequest())
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error', () => (
    expectSaga(getEvents)
    .provide([
      [call(request, '/events', 'GET', undefined, true),
      { status: 401 }],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getEventsFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getEventsRequest())
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage', () => (
    expectSaga(getEvents)
    .provide([
      [call(request, '/events', 'GET', undefined, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getEventsFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getEventsRequest())
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(eventsSaga)
    .fork(getEvents)
    .run()
  ));
});

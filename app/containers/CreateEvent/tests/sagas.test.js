/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import {
  createEvent,
  createEventSaga,
} from '../sagas';
import {
  createEventRequest,
  createEventFailure,
  createEventSuccess,
  sendingRequest,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const event = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('testing createEvent saga', () => {
  beforeEach(() => global.localStorage.setItem('user_token', 'userTokenTest'));

  it('should alert that the request is no longer being sent and that if succeeded sent if the event was created', () => (
    expectSaga(createEvent)
    .provide([
      [call(request, '/events', 'POST', event, true),
      { status: 201 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createEventSuccess())
    .put(push('/events'))
    .dispatch(createEventRequest(event))
    .run()
  ));

  it('should alert that there was an error if there was a bad request', () => (
    expectSaga(createEvent)
    .provide([
      [call(request, '/events', 'POST', event, true),
      { status: 400, json: () => ({ message: 'Event not created' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createEventFailure(false))
    .dispatch(createEventRequest(event))
    .run()
  ));

  it('should alert that there was an error if the event already exists', () => (
    expectSaga(createEvent)
    .provide([
      [call(request, '/events', 'POST', event, true),
      { status: 400, json: () => ({ message: 'Already exists' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createEventFailure(true))
    .dispatch(createEventRequest(event))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error', () => (
    expectSaga(createEvent)
    .provide([
      [call(request, '/events', 'POST', event, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createEventFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createEventRequest(event))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage', () => (
    expectSaga(createEvent)
    .provide([
      [call(request, '/events', 'POST', event, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createEventFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createEventRequest(event))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(createEventSaga)
    .fork(createEvent)
    .run()
  ));
});

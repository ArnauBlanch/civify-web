/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import {
  getEvent,
  editEvent,
  editEventSaga,
} from '../sagas';
import {
  getEventRequest,
  getEventFailure,
  getEventSuccess,
  editEventRequest,
  editEventFailure,
  editEventSuccess,
  sendingRequest,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import { getEventsRequest } from '../../EventsPage/actions';
import request from '../../../utils/request';

const event = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('testing editEvent saga', () => {
  it('should alert that the request is no longer being sent and that it succeeded if the event was fetched', () => (
    expectSaga(getEvent)
    .provide([
      [call(request, '/events/12345', 'GET', undefined, true),
      { status: 200, json: () => ({ id: 1, title: 'test' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getEventSuccess({ id: 1, title: 'test' }))
    .dispatch(getEventRequest('12345'))
    .run()
  ));

  it('should alert that there was an error if the event to fetch does not exist', () => (
    expectSaga(getEvent)
    .provide([
      [call(request, '/events/404', 'GET', undefined, true),
      { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getEventFailure())
    .put(push('/event-not-found'))
    .dispatch(getEventRequest('404'))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error when fetching', () => (
    expectSaga(getEvent)
    .provide([
      [call(request, '/events/401', 'GET', undefined, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getEventFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getEventRequest('401'))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage when fetching', () => (
    expectSaga(getEvent)
    .provide([
      [call(request, '/events/12345', 'GET', undefined, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getEventFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getEventRequest('12345'))
    .run()
  ));

  // EDIT

  it('should alert that the request is no longer being sent and that it succeeded if the event was edited (from edit page)', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/12345', 'PATCH', event, true),
      { status: 200 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventSuccess())
    .put(push('/events'))
    .dispatch(editEventRequest('12345', event, true))
    .run()
  ));

  it('should alert that the request is no longer being sent and that it succeeded if the event was edited (from list page)', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/12345', 'PATCH', event, true),
      { status: 200 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventSuccess())
    .put(getEventsRequest())
    .dispatch(editEventRequest('12345', event, false))
    .run()
  ));

  it('should alert that there was an error if the event to edit does not exist', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/404', 'PATCH', event, true),
      { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(false, false))
    .put(push('/event-not-found'))
    .dispatch(editEventRequest('404', event, false))
    .run()
  ));

  it('should alert that there was an error if there was a bad request', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/400', 'PATCH', event, true),
      { status: 400, json: () => ({ message: 'else' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(false, false))
    .dispatch(editEventRequest('400', event, false))
    .run()
  ));

  it('should alert that there was an error if the event already exists', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/400', 'PATCH', event, true),
      { status: 400, json: () => ({ message: 'Number has already been taken' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(true, false))
    .dispatch(editEventRequest('400', event, false))
    .run()
  ));

  it('should alert that there was an error if the dates are invalid', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/400', 'PATCH', event, true),
      { status: 400, json: () => ({ message: 'End date must be after or equal to ???????' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(false, true))
    .dispatch(editEventRequest('400', event, false))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error when editing', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/401', 'PATCH', event, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(false, false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(editEventRequest('401', event, false))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage when editing', () => (
    expectSaga(editEvent)
    .provide([
      [call(request, '/events/1234', 'PATCH', event, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editEventFailure(false, false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(editEventRequest('1234', event, false))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(editEventSaga)
    .fork(getEvent)
    .fork(editEvent)
    .run()
  ));
});

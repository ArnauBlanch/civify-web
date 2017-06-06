/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import {
  getAchievement,
  editAchievement,
  editAchievementSaga,
} from '../sagas';
import {
  getAchievementRequest,
  getAchievementFailure,
  getAchievementSuccess,
  editAchievementRequest,
  editAchievementFailure,
  editAchievementSuccess,
  sendingRequest,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import { getAchievementsRequest } from '../../AchievementsPage/actions';
import request from '../../../utils/request';

const achievement = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('testing editAchievement saga', () => {
  it('should alert that the request is no longer being sent and that it succeeded if the achievement was fetched', () => (
    expectSaga(getAchievement)
    .provide([
      [call(request, '/achievements/12345', 'GET', undefined, true),
      { status: 200, json: () => ({ id: 1, title: 'test' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getAchievementSuccess({ id: 1, title: 'test' }))
    .dispatch(getAchievementRequest('12345'))
    .run()
  ));

  it('should alert that there was an error if the achievement to fetch does not exist', () => (
    expectSaga(getAchievement)
    .provide([
      [call(request, '/achievements/404', 'GET', undefined, true),
      { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getAchievementFailure())
    .put(push('/achievement-not-found'))
    .dispatch(getAchievementRequest('404'))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error when fetching', () => (
    expectSaga(getAchievement)
    .provide([
      [call(request, '/achievements/401', 'GET', undefined, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getAchievementFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getAchievementRequest('401'))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage when fetching', () => (
    expectSaga(getAchievement)
    .provide([
      [call(request, '/achievements/12345', 'GET', undefined, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(getAchievementFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getAchievementRequest('12345'))
    .run()
  ));

  // EDIT

  it('should alert that the request is no longer being sent and that it succeeded if the achievement was edited (from edit page)', () => (
    expectSaga(editAchievement)
    .provide([
      [call(request, '/achievements/12345', 'PATCH', achievement, true),
      { status: 200 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editAchievementSuccess())
    .put(push('/achievements'))
    .dispatch(editAchievementRequest('12345', achievement, true))
    .run()
  ));

  it('should alert that the request is no longer being sent and that it succeeded if the achievement was edited (from list page)', () => (
    expectSaga(editAchievement)
    .provide([
      [call(request, '/achievements/12345', 'PATCH', achievement, true),
      { status: 200 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editAchievementSuccess())
    .put(getAchievementsRequest())
    .dispatch(editAchievementRequest('12345', achievement, false))
    .run()
  ));

  it('should alert that there was an error if the achievement to edit does not exist', () => (
    expectSaga(editAchievement)
    .provide([
      [call(request, '/achievements/404', 'PATCH', achievement, true),
      { status: 404 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editAchievementFailure())
    .put(push('/achievement-not-found'))
    .dispatch(editAchievementRequest('404', achievement, false))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error when editing', () => (
    expectSaga(editAchievement)
    .provide([
      [call(request, '/achievements/401', 'PATCH', achievement, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editAchievementFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(editAchievementRequest('401', achievement, false))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage when editing', () => (
    expectSaga(editAchievement)
    .provide([
      [call(request, '/achievements/1234', 'PATCH', achievement, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(editAchievementFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(editAchievementRequest('1234', achievement, false))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(editAchievementSaga)
    .fork(getAchievement)
    .fork(editAchievement)
    .run()
  ));
});

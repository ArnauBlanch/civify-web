/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import {
  createAchievement,
  createAchievementSaga,
} from '../sagas';
import {
  createAchievementRequest,
  createAchievementFailure,
  createAchievementSuccess,
  sendingRequest,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const achievement = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('testing createAchievement saga', () => {
  it('should alert that the request is no longer being sent and that if succeeded sent if the achievement was created', () => (
    expectSaga(createAchievement)
    .provide([
      [call(request, '/achievements', 'POST', achievement, true),
      { status: 201 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createAchievementSuccess())
    .put(push('/achievements'))
    .dispatch(createAchievementRequest(achievement))
    .run()
  ));

  it('should alert that there was an error if there was a bad request', () => (
    expectSaga(createAchievement)
    .provide([
      [call(request, '/achievements', 'POST', achievement, true),
      { status: 400, json: () => ({ message: 'Achievement not created' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createAchievementFailure(false))
    .dispatch(createAchievementRequest(achievement))
    .run()
  ));

  it('should alert that there was an error if the achievement already exists', () => (
    expectSaga(createAchievement)
    .provide([
      [call(request, '/achievements', 'POST', achievement, true),
      { status: 400, json: () => ({ message: 'Number has already been taken' }) }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createAchievementFailure(true))
    .dispatch(createAchievementRequest(achievement))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error', () => (
    expectSaga(createAchievement)
    .provide([
      [call(request, '/achievements', 'POST', achievement, true),
      { status: 401 }],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createAchievementFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createAchievementRequest(achievement))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage', () => (
    expectSaga(createAchievement)
    .provide([
      [call(request, '/achievements', 'POST', achievement, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(sendingRequest(true))
    .put(sendingRequest(false))
    .put(createAchievementFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(createAchievementRequest(achievement))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(createAchievementSaga)
    .fork(createAchievement)
    .run()
  ));
});

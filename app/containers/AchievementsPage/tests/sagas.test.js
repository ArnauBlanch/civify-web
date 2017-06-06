/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import { getAchievements, achievementsSaga } from '../sagas';
import {
  getAchievementsRequest,
  getAchievementsFailure,
  getAchievementsSuccess,
  currentlySending,
} from '../actions';
import { logoutRequest } from '../../LoginPage/actions';
import request from '../../../utils/request';

const achievements = [{ id: 1 }, { id: 2 }];

describe('AchievementsPage Saga', () => {
  it('should alert that the request is no longer being sent and that it succeeded', () => (
    expectSaga(getAchievements)
    .provide([
      [call(request, '/achievements', 'GET', undefined, true),
      { status: 200, json: () => achievements }],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getAchievementsSuccess(achievements))
    .dispatch(getAchievementsRequest(undefined))
    .run()
  ));

  it('should logout and redirect to login if there is an authentication error', () => (
    expectSaga(getAchievements)
    .provide([
      [call(request, '/achievements', 'GET', undefined, true),
      { status: 401 }],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getAchievementsFailure(false))
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getAchievementsRequest(undefined))
    .run()
  ));

  it('should logout and redirect to login if there is no auth_token in localStorage', () => (
    expectSaga(getAchievements)
    .provide([
      [call(request, '/achievements', 'GET', undefined, true),
        throwError(new Error('No auth_token in localStorage'))],
    ])
    .put(currentlySending(true))
    .put(currentlySending(false))
    .put(getAchievementsFailure())
    .put(logoutRequest())
    .put(push('/login'))
    .dispatch(getAchievementsRequest(undefined))
    .run()
  ));
});

describe('testing default saga', () => {
  it('should fork the internal sagas', () => (
    expectSaga(achievementsSaga)
    .fork(getAchievements)
    .run()
  ));
});

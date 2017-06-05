import { actionTest } from 'redux-jest';
import {
  getAchievementsRequest,
  getAchievementsSuccess,
  getAchievementsFailure,
  currentlySending,
} from '../actions';
import {
  GET_ACHIEVEMENTS_REQUEST,
  GET_ACHIEVEMENTS_SUCCESS,
  GET_ACHIEVEMENTS_FAILURE,
  CURRENTLY_SENDING,
} from '../constants';

describe('AchievementsPage actions', () => {
  actionTest('should create an action to do a request the achievements list',
    getAchievementsRequest,
    true,
    { type: GET_ACHIEVEMENTS_REQUEST, enabled: true }
  );

  actionTest('should create an action to alert that a request has been sent',
    currentlySending,
    true,
    { type: CURRENTLY_SENDING, sending: true }
  );

  actionTest('should create an action to notify that the achievements list was fetched successfully',
    getAchievementsSuccess,
    [{ id: 1 }, { id: 2 }],
    { type: GET_ACHIEVEMENTS_SUCCESS, achievements: [{ id: 1 }, { id: 2 }] }
  );

  actionTest('should create an action to notify that the achievements list couldn\'t be fetched',
    getAchievementsFailure,
    null,
    { type: GET_ACHIEVEMENTS_FAILURE }
  );
});

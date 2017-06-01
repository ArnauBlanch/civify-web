import { actionTest } from 'redux-jest';
import {
  createAchievementRequest,
  createAchievementFailure,
  createAchievementSuccess,
  sendingRequest,
} from '../actions';
import {
  CREATE_ACHIEVEMENT_REQUEST,
  CREATE_ACHIEVEMENT_SUCCESS,
  CREATE_ACHIEVEMENT_FAILURE,
  SENDING_REQUEST,
} from '../constants';

const achievement = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('CreateAchievement actions', () => {
  actionTest('should create an action to do a request a achievement creation',
    createAchievementRequest,
    achievement,
    { type: CREATE_ACHIEVEMENT_REQUEST, achievement }
  );

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to notify that the achievement was created successfully',
    createAchievementSuccess,
    null,
    { type: CREATE_ACHIEVEMENT_SUCCESS }
  );

  actionTest('should create an action to notify that the achievement creation failed',
    createAchievementFailure,
    false,
    { type: CREATE_ACHIEVEMENT_FAILURE, alreadyExists: false }
  );
});

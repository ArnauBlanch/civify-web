import { actionTest } from 'redux-jest';
import {
  getAchievementRequest,
  getAchievementFailure,
  getAchievementSuccess,
  editAchievementRequest,
  editAchievementFailure,
  editAchievementSuccess,
  sendingRequest,
} from '../actions';
import {
  GET_ACHIEVEMENT_REQUEST,
  GET_ACHIEVEMENT_SUCCESS,
  GET_ACHIEVEMENT_FAILURE,
  EDIT_ACHIEVEMENT_REQUEST,
  EDIT_ACHIEVEMENT_SUCCESS,
  EDIT_ACHIEVEMENT_FAILURE,
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

describe('EditAchievement actions', () => {
  actionTest('should create an action to request an achievement',
    getAchievementRequest,
    '12345',
    { type: GET_ACHIEVEMENT_REQUEST, achievementID: '12345' },
  );

  it('should create an action to edit an achievement', () => {
    expect(editAchievementRequest('12345', { title: 'test' }, true))
    .toEqual({
      type: EDIT_ACHIEVEMENT_REQUEST,
      achievementID: '12345',
      newValues: { title: 'test' },
      isEditing: true,
    });
  });

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to notify that the achievement was fetched successfully',
    getAchievementSuccess,
    achievement,
    { type: GET_ACHIEVEMENT_SUCCESS, achievement }
  );

  actionTest('should create an action to notify that the achievement was edited successfully',
    editAchievementSuccess,
    null,
    { type: EDIT_ACHIEVEMENT_SUCCESS }
  );

  actionTest('should edit an action to notify that it could not fetch the achievement',
    getAchievementFailure,
    null,
    { type: GET_ACHIEVEMENT_FAILURE }
  );

  actionTest('should edit an action to notify that the achievement edition failed',
    editAchievementFailure,
    null,
    { type: EDIT_ACHIEVEMENT_FAILURE }
  );
});

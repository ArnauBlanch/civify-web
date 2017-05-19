import { actionTest } from 'redux-jest';
import {
  getRewardsRequest,
  getRewardsSuccess,
  getRewardsFailed,
  deleteRewardRequest,
  deleteRewardSuccess,
} from '../actions';
import {
  GET_REWARDS_REQUEST,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAILED,
  DELETE_REWARD_REQUEST,
  DELETE_REWARD_SUCCESS,
} from '../constants';

const rewards = [{ id: 1 }, { id: 2 }];

describe('RewardsPage actions', () => {
  actionTest('should create an action to do a registration request',
    getRewardsRequest,
    undefined,
    { type: GET_REWARDS_REQUEST }
  );

  actionTest('should create an action to alert that a request has been sent',
    getRewardsSuccess,
    rewards,
    { type: GET_REWARDS_SUCCESS, rewards }
  );

  actionTest('should create an action to alert of a fail',
    getRewardsFailed,
    undefined,
    { type: GET_REWARDS_FAILED }
  );

  actionTest('should create an action to delete a reward',
    deleteRewardRequest,
    '1234',
    { type: DELETE_REWARD_REQUEST, rewardID: '1234' }
  );

  actionTest('should create an action to alert that a reward has been deleted',
    deleteRewardSuccess,
    '1234',
    { type: DELETE_REWARD_SUCCESS },
  );
});

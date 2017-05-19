import { actionTest } from 'redux-jest';
import {
  getRewardsRequest,
  getRewardsSuccess,
  getRewardsFailed,
} from '../actions';
import {
  GET_REWARDS_REQUEST,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAILED,
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

  actionTest('should create an action to check if a username is not used yet',
    getRewardsFailed,
    undefined,
    { type: GET_REWARDS_FAILED }
  );
});

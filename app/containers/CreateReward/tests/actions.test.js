import { actionTest } from 'redux-jest';
import {
  createRewardRequest,
  createRewardFailed,
  createRewardSuccess,
  sendingRequest,
} from '../actions';
import {
  CREATE_REWARD_REQUEST,
  CREATE_REWARD_SUCCESS,
  CREATE_REWARD_FAILED,
  SENDING_REQUEST,
} from '../constants';

const reward = {
  title: 'title',
  description: 'description',
  price: 100,
  image: {
    filename: 'test.jpg',
    content_type: 'image/jpeg',
    content: 'fdsfsadfsafasd',
  },
};

describe('CreateReward actions', () => {
  actionTest('should create an action to do a request a reward creation',
    createRewardRequest,
    reward,
    { type: CREATE_REWARD_REQUEST, reward }
  );

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to notify that the reward was created successfully',
    createRewardSuccess,
    null,
    { type: CREATE_REWARD_SUCCESS }
  );

  actionTest('should create an action to check if an e-mail is not used yet',
    createRewardFailed,
    null,
    { type: CREATE_REWARD_FAILED }
  );
});

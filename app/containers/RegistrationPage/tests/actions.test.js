import { actionTest } from 'redux-jest';
import {
  registerRequest,
  sendingRequest,
  checkUnusedUsername,
  checkUnusedEmail,
  unusedUsername,
  unusedEmail,
} from '../actions';
import {
  REGISTER_REQUEST,
  SENDING_REQUEST,
  CHECK_UNUSED_USERNAME,
  CHECK_UNUSED_EMAIL,
  UNUSED_USERNAME,
  UNUSED_EMAIL,
} from '../constants';

const user = {
  name: 'test name',
  username: 'test username',
  email: 'test@email.com',
  password: 'test password',
};

describe('RegistrationPage actions', () => {
  actionTest('should create an action to do a registration request',
    registerRequest,
    user,
    { type: REGISTER_REQUEST, data: user }
  );

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to check if a username is not used yet',
    checkUnusedUsername,
    'username test',
    { type: CHECK_UNUSED_USERNAME, username: 'username test' }
  );

  actionTest('should create an action to check if an e-mail is not used yet',
    checkUnusedEmail,
    'email test',
    { type: CHECK_UNUSED_EMAIL, email: 'email test' }
  );

  actionTest('should create an action to mark if a username is not used yet',
    unusedUsername,
    true,
    { type: UNUSED_USERNAME, unused: true }
  );

  actionTest('should mark if an e-mail is not used yet',
    unusedEmail,
    true,
    { type: UNUSED_EMAIL, unused: true }
  );
});

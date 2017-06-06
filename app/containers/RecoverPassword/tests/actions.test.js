import { actionTest } from 'redux-jest';
import {
  recoverPasswordRequest,
  recoverPasswordSuccess,
  recoverPasswordFailure,
} from '../actions';
import {
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
} from '../constants';

describe('RecoverPassword actions', () => {
  actionTest('should create an action to do a request a password recovery link',
    recoverPasswordRequest,
    'test@civify.cf',
    { type: RECOVER_PASSWORD_REQUEST, email: 'test@civify.cf' }
  );

  actionTest('should create an action to notify that the recovery link was sent successfully',
    recoverPasswordSuccess,
    null,
    { type: RECOVER_PASSWORD_SUCCESS }
  );

  actionTest('should create an action to notify that the request failed',
    recoverPasswordFailure,
    false,
    { type: RECOVER_PASSWORD_FAILURE, notFound: false }
  );
});

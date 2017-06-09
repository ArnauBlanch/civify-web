import { actionTest } from 'redux-jest';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../actions';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../constants';

describe('ResetPassword actions', () => {
  it('should create an action to do a request a password resety link', () => {
    expect(resetPasswordRequest('token', 'email', { password: 'test' }))
    .toEqual({ type: RESET_PASSWORD_REQUEST, token: 'token', email: 'email', requestBody: { password: 'test' } });
  });

  actionTest('should create an action to notify that the resety link was sent successfully',
    resetPasswordSuccess,
    null,
    { type: RESET_PASSWORD_SUCCESS }
  );

  actionTest('should create an action to notify that the request failed',
    resetPasswordFailure,
    'test',
    { type: RESET_PASSWORD_FAILURE, error: 'test' }
  );
});

import { reducerTest } from 'redux-jest'; //eslint-disable-line
import { fromJS } from 'immutable';
import resetPasswordReducer from '../reducer';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../actions';

describe('resetPasswordReducer', () => {
  reducerTest(
    'should clear the errors when sending request',
    resetPasswordReducer,
    fromJS({ error: true, notFound: true, reset: true, expired: true, invalidToken: true }),
    resetPasswordRequest('token', 'email', { password: 'test' }),
    fromJS({ error: false, notFound: false, reset: false, expired: false, invalidToken: false }),
  );

  reducerTest(
    'should update the sent flag when the request is successful',
    resetPasswordReducer,
    fromJS({ error: true, notFound: true, reset: false, expired: true, invalidToken: true }),
    resetPasswordSuccess(),
    fromJS({ error: false, notFound: false, reset: true, expired: false, invalidToken: false }),
  );

  reducerTest(
    'should update the error flag when the request fails (unknown error)',
    resetPasswordReducer,
    fromJS({ error: false, notFound: true, reset: false, expired: false, invalidToken: true }),
    resetPasswordFailure('other'),
    fromJS({ error: true, notFound: false, reset: false, expired: false, invalidToken: false }),
  );

  reducerTest(
    'should update the error flag when the request fails (e-mail not found)',
    resetPasswordReducer,
    fromJS({ error: false, notFound: false, reset: false, expired: false, invalidToken: false }),
    resetPasswordFailure('notFound'),
    fromJS({ error: false, notFound: true, reset: false, expired: false, invalidToken: false }),
  );

  reducerTest(
    'should update the error flag when the request fails (link expired)',
    resetPasswordReducer,
    fromJS({ error: false, notFound: false, reset: false, expired: false, invalidToken: false }),
    resetPasswordFailure('expired'),
    fromJS({ error: false, notFound: false, reset: false, expired: true, invalidToken: false }),
  );

  reducerTest(
    'should update the error flag when the request fails (invalid token)',
    resetPasswordReducer,
    fromJS({ error: false, notFound: false, reset: false, expired: false, invalidToken: false }),
    resetPasswordFailure('invalidToken'),
    fromJS({ error: false, notFound: false, reset: false, expired: false, invalidToken: true }),
  );

  reducerTest(
    'should not change the current state',
    resetPasswordReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

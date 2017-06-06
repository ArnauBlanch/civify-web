import { reducerTest } from 'redux-jest'; //eslint-disable-line
import { fromJS } from 'immutable';
import recoverPasswordReducer from '../reducer';
import {
  recoverPasswordRequest,
  recoverPasswordSuccess,
  recoverPasswordFailure,
} from '../actions';

describe('recoverPasswordReducer', () => {
  reducerTest(
    'should clear the errors when sending request',
    recoverPasswordReducer,
    fromJS({ error: true, notFound: true, sent: true }),
    recoverPasswordRequest('email'),
    fromJS({ error: false, notFound: false, sent: false }),
  );

  reducerTest(
    'should update the sent flag when the request is successful',
    recoverPasswordReducer,
    fromJS({ error: true, notFound: true, sent: false }),
    recoverPasswordSuccess(),
    fromJS({ error: false, notFound: false, sent: true }),
  );

  reducerTest(
    'should update the error flag when the request fails',
    recoverPasswordReducer,
    fromJS({ error: false, notFound: false }),
    recoverPasswordFailure(false),
    fromJS({ error: true, notFound: false }),
  );

  reducerTest(
    'should update the error flag when the request fails because the user is not found',
    recoverPasswordReducer,
    fromJS({ error: false, notFound: false }),
    recoverPasswordFailure(true),
    fromJS({ error: false, notFound: true }),
  );

  reducerTest(
    'should not change the current state',
    recoverPasswordReducer,
    fromJS({}),
    { type: undefined },
    fromJS({})
  );
});

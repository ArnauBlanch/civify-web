import { actionTest } from 'redux-jest';
import {
  createEventRequest,
  createEventFailure,
  createEventSuccess,
  sendingRequest,
} from '../actions';
import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  SENDING_REQUEST,
} from '../constants';

const event = {
  title: 'title',
  description: 'description',
  kind: 'issue',
  number: 10,
  coins: 10,
  xp: 10,
};

describe('CreateEvent actions', () => {
  actionTest('should create an action to do a request a event creation',
    createEventRequest,
    event,
    { type: CREATE_EVENT_REQUEST, event }
  );

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to notify that the event was created successfully',
    createEventSuccess,
    null,
    { type: CREATE_EVENT_SUCCESS }
  );

  it('should create an action to notify that the event creation failed', () => {
    expect(createEventFailure(true, false))
    .toEqual({ type: CREATE_EVENT_FAILURE, alreadyExists: true, datesError: false });
  });
});

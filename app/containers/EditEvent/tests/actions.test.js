import { actionTest } from 'redux-jest';
import {
  getEventRequest,
  getEventFailure,
  getEventSuccess,
  editEventRequest,
  editEventFailure,
  editEventSuccess,
  sendingRequest,
} from '../actions';
import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
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

describe('EditEvent actions', () => {
  actionTest('should create an action to request an event',
    getEventRequest,
    '12345',
    { type: GET_EVENT_REQUEST, eventID: '12345' },
  );

  it('should create an action to edit an event', () => {
    expect(editEventRequest('12345', { title: 'test' }, true))
    .toEqual({
      type: EDIT_EVENT_REQUEST,
      eventID: '12345',
      newValues: { title: 'test' },
      isEditing: true,
    });
  });

  actionTest('should create an action to alert that a request has been sent',
    sendingRequest,
    true,
    { type: SENDING_REQUEST, sending: true }
  );

  actionTest('should create an action to notify that the event was fetched successfully',
    getEventSuccess,
    event,
    { type: GET_EVENT_SUCCESS, event }
  );

  actionTest('should create an action to notify that the event was edited successfully',
    editEventSuccess,
    null,
    { type: EDIT_EVENT_SUCCESS }
  );

  actionTest('should edit an action to notify that it could not fetch the event',
    getEventFailure,
    null,
    { type: GET_EVENT_FAILURE }
  );

  it('should create an action to notify that the event edition failed', () => {
    expect(editEventFailure(true, false))
    .toEqual({ type: EDIT_EVENT_FAILURE, alreadyExists: true, invalidDates: false });
  });
});

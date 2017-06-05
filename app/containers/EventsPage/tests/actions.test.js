import { actionTest } from 'redux-jest';
import {
  getEventsRequest,
  getEventsSuccess,
  getEventsFailure,
  currentlySending,
} from '../actions';
import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  CURRENTLY_SENDING,
} from '../constants';

describe('EventsPage actions', () => {
  actionTest('should create an action to do a request the events list',
    getEventsRequest,
    true,
    { type: GET_EVENTS_REQUEST, enabled: true }
  );

  actionTest('should create an action to alert that a request has been sent',
    currentlySending,
    true,
    { type: CURRENTLY_SENDING, sending: true }
  );

  actionTest('should create an action to notify that the events list was fetched successfully',
    getEventsSuccess,
    [{ id: 1 }, { id: 2 }],
    { type: GET_EVENTS_SUCCESS, events: [{ id: 1 }, { id: 2 }] }
  );

  actionTest('should create an action to notify that the events list couldn\'t be fetched',
    getEventsFailure,
    null,
    { type: GET_EVENTS_FAILURE }
  );
});

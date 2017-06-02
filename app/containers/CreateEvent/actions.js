/*
 *
 * CreateEvent actions
 *
 */

import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

export function createEventRequest(event) {
  return { type: CREATE_EVENT_REQUEST, event };
}

export function createEventSuccess() {
  return { type: CREATE_EVENT_SUCCESS };
}

export function createEventFailure(alreadyExists) {
  return { type: CREATE_EVENT_FAILURE, alreadyExists };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

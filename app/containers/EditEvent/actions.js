/*
 *
 * CreateEvent actions
 *
 */

import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

export function getEventRequest(eventID) {
  return { type: GET_EVENT_REQUEST, eventID };
}

export function getEventSuccess(event) {
  return { type: GET_EVENT_SUCCESS, event };
}

export function getEventFailure() {
  return { type: GET_EVENT_FAILURE };
}

export function editEventRequest(eventID, newValues, isEditing) {
  return { type: EDIT_EVENT_REQUEST, eventID, newValues, isEditing };
}

export function editEventSuccess() {
  return { type: EDIT_EVENT_SUCCESS };
}

export function editEventFailure(alreadyExists, invalidDates) {
  return { type: EDIT_EVENT_FAILURE, alreadyExists, invalidDates };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

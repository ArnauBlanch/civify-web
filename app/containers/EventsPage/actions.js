/*
 *
 * EventsPage actions
 *
 */

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

export function getEventsRequest(enabled) {
  return { type: GET_EVENTS_REQUEST, enabled };
}

export function getEventsSuccess(events) {
  return { type: GET_EVENTS_SUCCESS, events };
}

export function getEventsFailure() {
  return { type: GET_EVENTS_FAILURE };
}

export function currentlySending(sending) {
  return { type: CURRENTLY_SENDING, sending };
}

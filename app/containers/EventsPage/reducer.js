/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

const initialState = fromJS({
  events: undefined,
  error: false,
  currentlySending: false,
});

function eventsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return state.set('events', fromJS(action.events)).set('error', false);
    case GET_EVENTS_FAILURE:
      return state.set('error', true);
    case CURRENTLY_SENDING:
      return state.set('currentlySending', action.sending);
    default:
      return state;
  }
}

export default eventsPageReducer;

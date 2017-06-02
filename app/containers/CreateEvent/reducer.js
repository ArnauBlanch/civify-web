/*
 *
 * CreateEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  currentlySending: false,
  eventError: false,
  datesError: false,
  alreadyExists: false,
});

function createEventReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case CREATE_EVENT_SUCCESS:
      return state.set('eventError', false)
      .set('alreadyExists', false).set('datesError', false);
    case CREATE_EVENT_FAILURE:
      return state.set('eventError', true).set('datesError', action.datesError)
        .set('alreadyExists', action.alreadyExists);
    default:
      return state;
  }
}

export default createEventReducer;

/*
 *
 * EditEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  SENDING_REQUEST,
} from './constants';

const initialState = fromJS({
  event: undefined,
  getError: false,
  currentlySending: false,
  editError: false,
  datesError: false,
  alreadyExists: false,
});

function editEventReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case GET_EVENT_REQUEST:
      return state.set('editError', false).set('datesError', false).set('alreadyExists', false);
    case GET_EVENT_SUCCESS:
      return state.set('getError', false).set('event', fromJS(action.event));
    case GET_EVENT_FAILURE:
      return state.set('getError', true);
    case EDIT_EVENT_SUCCESS:
      return state.set('editError', false).set('datesError', false).set('alreadyExists', false);
    case EDIT_EVENT_FAILURE:
      return state.set('editError', true)
      .set('datesError', action.invalidDates)
      .set('alreadyExists', action.alreadyExists);
    default:
      return state;
  }
}

export default editEventReducer;

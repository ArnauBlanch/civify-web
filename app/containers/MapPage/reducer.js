/*
 *
 * MapPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ISSUES_INFO_SUCCESS,
} from './constants';

const initialState = fromJS({});

function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    // case ISSUES_INFO_SUCCESS:
    //   return state.set('issues', action.issues);
    default:
      return state;
  }
}

export default mapPageReducer;

/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { LOGIN_SUCCESS, LOGOUT_REQUEST } from './containers/LoginPage/constants';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const authInitialState = fromJS({
  isAuthenticated: localStorage.getItem('auth_token') !== null,
  isAdmin: localStorage.getItem('auth_admin') !== null,
});

export function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('auth_admin', action.isAdmin);
      return state.set('isAuthenticated', true).set('isAdmin', action.isAdmin);
    case LOGOUT_REQUEST:
      localStorage.removeItem('user_token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_admin');
      return state.set('isAuthenticated', false).set('isAdmin', undefined);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    form: formReducer,
    language: languageProviderReducer,
    auth: authReducer,
    ...asyncReducers,
  });
}

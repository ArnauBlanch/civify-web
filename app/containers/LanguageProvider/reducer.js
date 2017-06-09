/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHANGE_LOCALE,
} from './constants';
import {
  DEFAULT_LOCALE,
} from '../App/constants'; // eslint-disable-line

function getLanguage() {
  if (localStorage.getItem('language')) {
    return localStorage.getItem('language');
  } else if (['ca', 'es'].indexOf(navigator.language) !== -1) {
    return navigator.language;
  }
  return DEFAULT_LOCALE;
}

const initialState = fromJS({
  locale: getLanguage(),
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      localStorage.setItem('language', action.locale);
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;

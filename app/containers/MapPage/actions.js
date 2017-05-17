/*
 *
 * MapPage actions
 *
 */

import {
  ISSUES_REQUEST,
  ISSUES_INFO_SUCCESS,
  ISSUES_INFO_FAIL,
} from './constants';

export function issuesRequest() {
  return { type: ISSUES_REQUEST };
}

export function issuesInfoSuccess(issues) {
  return { type: ISSUES_INFO_SUCCESS, issues };
}

export function issuesInfoFail() {
  return { type: ISSUES_INFO_FAIL };
}

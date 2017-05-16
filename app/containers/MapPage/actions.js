/*
 *
 * MapPage actions
 *
 */

import {
  ISSUES_REQUEST,
} from './constants';

export function issuesRequest() {
  return { type: ISSUES_REQUEST };
}

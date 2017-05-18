import { actionTest } from 'redux-jest'; // eslint-disable-line
import {
  issuesRequest,
  issuesInfoSuccess,
  issuesInfoFail,
} from '../actions';
import {
  ISSUES_REQUEST,
  ISSUES_INFO_SUCCESS,
  ISSUES_INFO_FAIL,
} from '../constants';

const issues = [
  {
    latitude: 41.2645,
    longitude: 3.15161,
    category: 'illumination',
  }, {
    latitude: 43.2645,
    longitude: 1.15161,
    category: 'illumination',
  },
];

describe('MapPage actions', () => {
  actionTest('should create an action to do the issues request',
    issuesRequest,
    null,
    { type: ISSUES_REQUEST }
  );

  actionTest('should create an action to handle the success on issues request',
    issuesInfoSuccess,
    issues,
    { type: ISSUES_INFO_SUCCESS, issues }
  );

  actionTest('should create an action to handle error on issues request',
    issuesInfoFail,
    null,
    { type: ISSUES_INFO_FAIL }
  );
});

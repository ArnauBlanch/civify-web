import { reducerTest } from 'redux-jest'; //eslint-disable-line
import { fromJS } from 'immutable';
import mapPageReducer from '../reducer';
import {
  issuesInfoSuccess,
} from '../actions';

const issuesExpected = [
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

describe('mapPageReducer', () => {
  reducerTest(
    'should update the \'issues\' array in the mapState',
    mapPageReducer,
    fromJS({ issues: [] }),
    issuesInfoSuccess(issuesExpected),
    fromJS({ issues: issuesExpected })
  );
});

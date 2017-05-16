
import { fromJS } from 'immutable';
import mapPageReducer from '../reducer';

describe('mapPageReducer', () => {
  it('returns the initial state', () => {
    expect(mapPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

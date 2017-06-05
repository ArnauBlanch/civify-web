
import { fromJS } from 'immutable';
import achievementsPageReducer from '../reducer';

describe('achievementsPageReducer', () => {
  it('returns the initial state', () => {
    expect(achievementsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

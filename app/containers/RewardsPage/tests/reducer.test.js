
import { fromJS } from 'immutable';
import rewardsPageReducer from '../reducer';

describe('rewardsPageReducer', () => {
  it('returns the initial state', () => {
    expect(rewardsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

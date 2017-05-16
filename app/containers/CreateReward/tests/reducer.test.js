
import { fromJS } from 'immutable';
import createRewardReducer from '../reducer';

describe('createRewardReducer', () => {
  it('returns the initial state', () => {
    expect(createRewardReducer(undefined, {})).toEqual(fromJS({}));
  });
});

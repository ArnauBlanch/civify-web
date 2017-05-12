
import { fromJS } from 'immutable';
import registrationPageReducer from '../reducer';

describe('registrationPageReducer', () => {
  it('returns the initial state', () => {
    expect(registrationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

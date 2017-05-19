import { createSelector } from 'reselect';

/**
 * Direct selector to the createReward state domain
 */
const selectCreateRewardDomain = () => (state) => state.get('createReward');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CreateReward
 */

const makeSelectCreateReward = () => createSelector(
  selectCreateRewardDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCreateReward;
export {
  selectCreateRewardDomain,
};

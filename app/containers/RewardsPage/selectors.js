import { createSelector } from 'reselect';

/**
 * Direct selector to the rewardsPage state domain
 */
const selectRewardsPageDomain = () => (state) => state.get('rewardsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RewardsPage
 */

const makeSelectRewardsPage = () => createSelector(
  selectRewardsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRewardsPage;
export {
  selectRewardsPageDomain,
};

import { createSelector } from 'reselect';

/**
 * Direct selector to the validateRewardsPage state domain
 */
const selectValidateRewardsPageDomain = () => (state) => state.get('validateRewardsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ValidateRewardsPage
 */

const makeSelectValidateRewardsPage = () => createSelector(
  selectValidateRewardsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectValidateRewardsPage;
export {
  selectValidateRewardsPageDomain,
};

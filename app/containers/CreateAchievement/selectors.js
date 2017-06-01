import { createSelector } from 'reselect';

/**
 * Direct selector to the createAchievement state domain
 */
const selectCreateAchievementDomain = () => (state) => state.get('createAchievement');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CreateAchievement
 */

const makeSelectCreateAchievement = () => createSelector(
  selectCreateAchievementDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCreateAchievement;
export {
  selectCreateAchievementDomain,
};

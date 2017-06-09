import { createSelector } from 'reselect';

/**
 * Direct selector to the achievementsPage state domain
 */
const selectAchievementsPageDomain = () => (state) => state.get('achievementsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AchievementsPage
 */

const makeSelectAchievementsPage = () => createSelector(
  selectAchievementsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAchievementsPage;
export {
  selectAchievementsPageDomain,
};

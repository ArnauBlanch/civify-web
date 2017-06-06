import { createSelector } from 'reselect';

/**
 * Direct selector to the editAchievement state domain
 */
const selectEditAchievementDomain = () => (state) => state.get('editAchievement');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditAchievement
 */

const makeSelectEditAchievement = () => createSelector(
  selectEditAchievementDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditAchievement;
export {
  selectEditAchievementDomain,
};

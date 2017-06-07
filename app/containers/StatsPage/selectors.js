import { createSelector } from 'reselect';

/**
 * Direct selector to the statsPage state domain
 */
const selectStatsPageDomain = () => (state) => state.get('mapPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StatsPage
 */

const makeSelectStatsPage = () => createSelector(
  selectStatsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectStatsPage;
export {
  selectStatsPageDomain,
};

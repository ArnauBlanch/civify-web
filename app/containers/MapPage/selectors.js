import { createSelector } from 'reselect';

/**
 * Direct selector to the mapPage state domain
 */
const selectMapPageDomain = () => (state) => state.get('mapPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MapPage
 */

const makeSelectMapPage = () => createSelector(
  selectMapPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMapPage;
export {
  selectMapPageDomain,
};

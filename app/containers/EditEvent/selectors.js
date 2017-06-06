import { createSelector } from 'reselect';

/**
 * Direct selector to the editEvent state domain
 */
const selectEditEventDomain = () => (state) => state.get('editEvent');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditEvent
 */

const makeSelectEditEvent = () => createSelector(
  selectEditEventDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditEvent;
export {
  selectEditEventDomain,
};

import { createSelector } from 'reselect';

/**
 * Direct selector to the createEvent state domain
 */
const selectCreateEventDomain = () => (state) => state.get('createEvent');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CreateEvent
 */

const makeSelectCreateEvent = () => createSelector(
  selectCreateEventDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCreateEvent;
export {
  selectCreateEventDomain,
};

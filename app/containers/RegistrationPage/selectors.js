import { createSelector } from 'reselect';

/**
 * Direct selector to the registrationPage state domain
 */
const selectRegistrationPageDomain = () => (state) => state.get('registrationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RegistrationPage
 */

const makeSelectRegistrationPage = () => createSelector(
  selectRegistrationPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRegistrationPage;
export {
  selectRegistrationPageDomain,
};

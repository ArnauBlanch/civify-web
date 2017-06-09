import { createSelector } from 'reselect';

/**
 * Direct selector to the recoverPassword state domain
 */
const selectRecoverPasswordDomain = () => (state) => state.get('recoverPassword');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RecoverPassword
 */

const makeSelectRecoverPassword = () => createSelector(
  selectRecoverPasswordDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRecoverPassword;
export {
  selectRecoverPasswordDomain,
};

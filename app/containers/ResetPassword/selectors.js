import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPassword state domain
 */
const selectResetPasswordDomain = () => (state) => state.get('resetPassword');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResetPassword
 */

const makeSelectResetPassword = () => createSelector(
  selectResetPasswordDomain(),
  (substate) => substate.toJS()
);

export default makeSelectResetPassword;
export {
  selectResetPasswordDomain,
};

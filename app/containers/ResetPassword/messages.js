/*
 * ResetPassword Messages
 *
 * This contains all the text for the ResetPassword component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  resetPassword: {
    id: 'app.containers.ResetPassword.reset-your-password',
    defaultMessage: 'Reset your password',
  },
  successMessage: {
    id: 'app.containers.ResetPassword.password-reseted',
    defaultMessage: 'The password has been succesfully reseted',
  },
  error: {
    id: 'app.containers.ResetPassword.there-was-an-error',
    defaultMessage: 'There was an error',
  },
  expired: {
    id: 'app.containers.ResetPassword.link-already-expired',
    defaultMessage: 'The link to reset your password has already expired',
  },
  notFound: {
    id: 'app.containers.ResetPassword.there-is-no-user-with-this-email',
    defaultMessage: 'There is no user with this e-mail',
  },
  invalidToken: {
    id: 'app.containers.ResetPassword.invalid-token',
    defaultMessage: 'Invalid token',
  },
});

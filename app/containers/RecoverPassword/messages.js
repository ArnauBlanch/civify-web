/*
 * RecoverPassword Messages
 *
 * This contains all the text for the RecoverPassword component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  recoverPassword: {
    id: 'app.containers.RecoverPassword.recover-your-password',
    defaultMessage: 'Recover your password',
  },
  successMessage: {
    id: 'app.containers.RecoverPassword.link-sent',
    defaultMessage: 'The instructions to recover your password have been sent to {email}.',
  },
  error: {
    id: 'app.containers.RecoverPassword.there-was-an-error',
    defaultMessage: 'There was an error',
  },
  notFound: {
    id: 'app.containers.RecoverPassword.there-is-no-user-with-this-email',
    defaultMessage: 'There is no user with this e-mail',
  },
});

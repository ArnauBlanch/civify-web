/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  signIn: {
    id: 'app.containers.LoginPage.sign-in',
    defaultMessage: 'Sign in',
  },
  register: {
    id: 'app.containers.LoginPage.register-now',
    defaultMessage: 'Register now',
  },
  notRegisteredBusiness: {
    id: 'app.containers.LoginPage.not-registered-business',
    defaultMessage: 'Do you have a business and would like to offer rewards in our app?',
  },
  wrongPassword: {
    id: 'app.containers.LoginPage.wrong-password',
    defaultMessage: 'Wrong password',
  },
  userDoesNotExist: {
    id: 'app.containers.LoginPage.user-does-not-exist',
    defaultMessage: 'User does not exist',
  },
  thereWasAnError: {
    id: 'app.containers.LoginPage.there-was-an-error',
    defaultMessage: 'There was an error',
  },
  noPrivileges: {
    id: 'app.containers.LoginPage.you-do-not-have-enough-privileges',
    defaultMessage: 'You do not have enough privileges',
  },
  recoverPassword: {
    id: 'app.containers.LoginPage.have-you-forgotten-your-password',
    defaultMessage: 'Have you forgotten your password?',
  },
});

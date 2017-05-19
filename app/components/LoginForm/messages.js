/*
 * RegisterForm Messages
 *
 * This contains all the text for the RegisterForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  usernameOrEmail: {
    id: 'app.containers.LoginForm.username-or-email',
    defaultMessage: 'Username or e-mail',
  },
  password: {
    id: 'app.containers.LoginForm.password',
    defaultMessage: 'Password',
  },
  signIn: {
    id: 'app.containers.LoginForm.signIn',
    defaultMessage: 'Sign in',
  },
  requiredField: {
    id: 'app.containers.LoginForm.required-field',
    defaultMessage: 'Required field',
  },
});

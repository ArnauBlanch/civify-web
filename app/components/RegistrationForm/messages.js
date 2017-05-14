/*
 * RegisterForm Messages
 *
 * This contains all the text for the RegisterForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  businessName: {
    id: 'app.containers.RegistrationForm.business-name',
    defaultMessage: 'Business name',
  },
  username: {
    id: 'app.containers.RegistrationForm.username',
    defaultMessage: 'Username',
  },
  email: {
    id: 'app.containers.RegistrationForm.email',
    defaultMessage: 'E-mail',
  },
  password: {
    id: 'app.containers.RegistrationForm.password',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'app.containers.RegistrationForm.confirm-password',
    defaultMessage: 'Confirm your password',
  },
  requiredField: {
    id: 'app.containers.RegistrationForm.required-field',
    defaultMessage: 'Required field',
  },
  invalidUsername: {
    id: 'app.containers.RegistrationForm.invalid-username',
    defaultMessage: 'Invalid username',
  },
  invalidEmail: {
    id: 'app.containers.RegistrationForm.invalid-email',
    defaultMessage: 'Invalid e-mail',
  },
  invalidPassword: {
    id: 'app.containers.RegistrationForm.invalid-password',
    defaultMessage: 'The password is invalid (Should have 8–40 characters, including at least 1 uppercase and 1 lowercase letter, 1 digit. Special characters allowed: @&#$%)',
  },
  passwordsDoNoMatch: {
    id: 'app.containers.RegistrationForm.passwords-do-not-match',
    defaultMessage: 'Passwords do not match',
  },
  submit: {
    id: 'app.containers.RegistrationForm.submit',
    defaultMessage: 'Submit',
  },
  usedUsername: {
    id: 'app.containers.RegistrationPage.used-username',
    defaultMessage: 'The username is already used',
  },
  usedEmail: {
    id: 'app.containers.RegistrationPage.used-email',
    defaultMessage: 'The e-mail is already used',
  },
});

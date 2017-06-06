/*
 * ResetPasswordForm Messages
 *
 * This contains all the text for the ResetPasswordForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  requiredField: {
    id: 'app.components.ResetPasswordForm.required-field',
    defaultMessage: 'Required field',
  },
  password: {
    id: 'app.containers.ResetPasswordForm.password',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'app.containers.RegistrationForm.confirm-password',
    defaultMessage: 'Confirm your password',
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
    id: 'app.components.ResetPasswordForm.submit',
    defaultMessage: 'Submit',
  },
  email: {
    id: 'app.components.ResetPasswordForm.email',
    defaultMessage: 'E-mail',
  },
});

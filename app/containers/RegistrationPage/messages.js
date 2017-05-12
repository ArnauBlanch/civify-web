/*
 * RegistrationPage Messages
 *
 * This contains all the text for the RegistrationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  businessRegistration: {
    id: 'app.containers.RegistrationPage.business-registration',
    defaultMessage: 'Business registration',
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

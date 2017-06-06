/*
 * EditAchievement Messages
 *
 * This contains all the text for the EditAchievement component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.EditAchievement.edit-achievement',
    defaultMessage: 'Edit achievement',
  },
  getError: {
    id: 'app.containers.EditAchievement.could-not-fetch-the-achievement',
    defaultMessage: 'Could not fetch the achievement',
  },
  editError: {
    id: 'app.containers.EditAchievement.could-not-edit-the-achievement',
    defaultMessage: 'Could not edit the achievement',
  },
});

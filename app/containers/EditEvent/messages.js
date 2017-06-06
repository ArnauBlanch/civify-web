/*
 * EditEvent Messages
 *
 * This contains all the text for the EditEvent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.EditEvent.edit-event',
    defaultMessage: 'Edit event',
  },
  getError: {
    id: 'app.containers.EditEvent.could-not-fetch-the-event',
    defaultMessage: 'Could not fetch the event',
  },
  editError: {
    id: 'app.containers.EditEvent.could-not-edit-the-event',
    defaultMessage: 'Could not edit the event',
  },
});

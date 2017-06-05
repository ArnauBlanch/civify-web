/*
 * EventRow Messages
 *
 * This contains all the text for the EventRow component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  createIssues: {
    id: 'app.components.EventRow.create-x-issues',
    defaultMessage: 'Create {num} issues',
  },
  confirmIssues: {
    id: 'app.components.EventRow.confirm-x-issues',
    defaultMessage: 'Confirm {num} issues',
  },
  resolveIssues: {
    id: 'app.components.EventRow.mark-x-issues-as-resolved',
    defaultMessage: 'Mark {num} issues as resolved',
  },
  close: {
    id: 'app.components.EventRow.close',
    defaultMessage: 'Close',
  },
  badge: {
    id: 'app.components.EventRow.badge',
    defaultMessage: 'Badge',
  },
});

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const GREEN = '#27AE60';
const RED = '#E74C3C';

export const VALIDATED = {
  color: GREEN,
  text: <FormattedMessage {...messages.validated} />,
};

export const ALREADY_USED = {
  color: RED,
  text: <FormattedMessage {...messages.alreadyUsed} />,
};

export const INVALID = {
  color: RED,
  text: <FormattedMessage {...messages.invalid} />,
};

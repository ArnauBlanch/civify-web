/*
 * AchievementsPage Messages
 *
 * This contains all the text for the AchievementsPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  achievements: {
    id: 'app.containers.AchievementsPage.achievements',
    defaultMessage: 'Achievements',
  },
  all: {
    id: 'app.containers.AchievementsPage.all',
    defaultMessage: 'All',
  },
  enabled: {
    id: 'app.containers.AchievementsPage.enabled',
    defaultMessage: 'Enabled',
  },
  disabled: {
    id: 'app.containers.AchievementsPage.disabled',
    defaultMessage: 'Disabled',
  },
  thereAreNoAchievements: {
    id: 'app.components.AchievementsPage.there-are-no-achievements',
    defaultMessage: 'There are no achievements',
  },
  error: {
    id: 'app.components.AchievementsPage.could-not-get-the-achievements',
    defaultMessage: 'Could not get the achievements',
  },
});

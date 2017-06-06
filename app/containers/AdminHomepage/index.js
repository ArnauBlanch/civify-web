/*
 *
 * AdminHomepage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Paper } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import AchievementsIcon from '../../images/achievements.svg';
import EventsIcon from '../../images/events.svg';
import messages from './messages';

export class AdminHomepage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const t = this.props.intl.formatMessage;
    return (
      <div style={{ width: '100%', maxWidth: 600 }}>
        <Helmet
          title={`Civify | ${t(messages.administration)}`}
          meta={[
            { name: 'description', content: 'App administration backoffice' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            padding: 30,
            marginTop: 20,
            marginBottom: 20,
          }}
          zDepth={4}
        >
          <h3><FormattedMessage {...messages.administration} /></h3>
          <div className="mdl-grid">
            <Link
              className="mdl-cell mdl-cell--6-col"
              to="/achievements"
              style={{ color: '#000', textDecoration: 'none' }}
            >
              <img src={AchievementsIcon} alt="Achievements" style={{ maxHeight: 200 }} />
              <h4><FormattedMessage {...messages.achievements} /></h4>
            </Link>
            <Link
              className="mdl-cell mdl-cell--6-col"
              to="/events"
              style={{ color: '#000', textDecoration: 'none' }}
            >
              <img src={EventsIcon} alt="Events" style={{ maxHeight: 200 }} />
              <h4><FormattedMessage {...messages.events} /></h4>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

AdminHomepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(injectIntl(AdminHomepage));

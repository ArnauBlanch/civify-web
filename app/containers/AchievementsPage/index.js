/*
 *
 * AchievementsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Paper, CircularProgress, FloatingActionButton, FlatButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { push } from 'react-router-redux';
import makeSelectAchievementsPage from './selectors';
import messages from './messages';
import AchievementsTable from '../../components/AchievementsTable';
import { getAchievementsRequest } from './actions';

const FABstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export class AchievementsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { enabled: undefined };
    this.filterChanged = this.filterChanged.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getAchievementsRequest(this.state.enabled));
  }

  filterChanged(enabled) {
    if (enabled !== this.state.enabled) {
      this.props.dispatch(getAchievementsRequest(enabled));
      this.setState({ enabled });
    }
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { enabled } = this.state;
    const { currentlySending, achievements, error } = this.props.AchievementsPage;
    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.achievements)}`}
          meta={[
            { name: 'description', content: 'Rewards of a business' },
          ]}
        />
        { currentlySending ? <CircularProgress size={60} /> :
          typeof achievements !== 'undefined' &&
          <Paper
            style={{
              textAlign: 'center',
              width: '100%',
              padding: 30,
              marginTop: 20,
              marginBottom: 20,
              maxWidth: 1000,
            }}
            zDepth={4}
          >
            <h3><FormattedMessage {...messages.achievements} /></h3>
            { (!error && (typeof achievements !== 'undefined')) &&
              <div style={{ width: '100%', textAlign: 'left' }}>
                <b>Filter:&nbsp;&nbsp;</b>
                <FlatButton
                  label={<FormattedMessage {...messages.all} />}
                  primary
                  disabled={typeof enabled === 'undefined'}
                  onTouchTap={() => this.filterChanged(undefined)}
                />
                <FlatButton
                  label={<FormattedMessage {...messages.enabled} />}
                  primary
                  disabled={typeof enabled !== 'undefined' && enabled}
                  onTouchTap={() => this.filterChanged(true)}
                />
                <FlatButton
                  label={<FormattedMessage {...messages.disabled} />}
                  primary
                  disabled={typeof enabled !== 'undefined' && !enabled}
                  onTouchTap={() => this.filterChanged(false)}
                />
              </div>
            }

            { error && <h5 style={{ color: 'red', margin: 50 }}>{'Couldn\'t get the achievements'}</h5> }
            <AchievementsTable achievements={achievements} />
            { !error && achievements.length === 0 &&
              <h5 style={{ color: '#888', margin: 50 }}>There are no achievements</h5> }
          </Paper>
        }
        <FloatingActionButton
          style={FABstyle}
          onClick={() => this.props.dispatch(push('/achievements/new'))}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

AchievementsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  AchievementsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AchievementsPage: makeSelectAchievementsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AchievementsPage));

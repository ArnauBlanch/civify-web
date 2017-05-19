/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { Paper, FloatingActionButton, RaisedButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ContentAdd from 'material-ui/svg-icons/content/add';

import makeSelectRewardsPage from './selectors';
import messages from './messages';
import { getRewardsRequest } from './actions';
import RewardCard from '../../components/RewardCard';
import QrCodeIcon from '../../QrCodeIcon';

const FABstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.props.dispatch(getRewardsRequest());
  }
  render() {
    const t = this.props.intl.formatMessage;
    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.myRewards)}`}
          meta={[
            { name: 'description', content: 'Rewards of a business' },
          ]}
        />
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
          <h3><FormattedMessage {...messages.myRewards} /></h3>
          { this.props.rewardsState.rewards && this.props.rewardsState.rewards.length !== 0 &&
            <RaisedButton
              href="/rewards/validate"
              label={<FormattedMessage {...messages.validate} />}
              primary
              backgroundColor="#27ae60"
              icon={<QrCodeIcon color="#ffffff" />}
              style={{ marginBottom: 20 }}
            />
          }
          { !this.props.rewardsState.error && this.props.rewardsState.rewards &&
            this.props.rewardsState.rewards.length === 0
              && <h5 style={{ color: '#888' }}><FormattedMessage {...messages.noRewards} /></h5>}
          <div className="mdl-grid">
            { this.props.rewardsState.rewards.map((reward) =>
              <RewardCard reward={reward} key={reward.award_auth_token} />) }
          </div>
        </Paper>
        <FloatingActionButton
          style={FABstyle}
          onClick={() => this.props.dispatch(push('/rewards/create'))}
        >
          <ContentAdd />
        </FloatingActionButton>

      </div>
    );
  }
}

RewardsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rewardsState: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rewardsState: makeSelectRewardsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RewardsPage));

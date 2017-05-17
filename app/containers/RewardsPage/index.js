/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, FloatingActionButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ContentAdd from 'material-ui/svg-icons/content/add';

import makeSelectRewardsPage from './selectors';
import messages from './messages';
import RewardCard from '../../components/RewardCard';

const style = {
  margin: 0,
  top: 'auto',
  right: 40,
  bottom: 40,
  left: 'auto',
  position: 'fixed',
};

export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
            maxWidth: 1000,
          }}
          zDepth={4}
        >
          <h3><FormattedMessage {...messages.myRewards} /></h3>
          <div className="mdl-grid">
            <RewardCard />
            <RewardCard />
            <RewardCard />
            <RewardCard />
            <RewardCard />
            <RewardCard />
          </div>
        </Paper><FloatingActionButton style={style}>
          <ContentAdd />
        </FloatingActionButton>

      </div>
    );
  }
}

RewardsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RewardsPage: makeSelectRewardsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RewardsPage));

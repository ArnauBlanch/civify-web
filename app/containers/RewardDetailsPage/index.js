/*
 *
 * RewardDetailsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, CardTitle, CardMedia, CardText, FlatButton, Dialog } from 'material-ui';
import { FormattedMessage, FormattedRelative, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import coinsIcon from '../../images/coins.svg';
import makeSelectRewardsPage from '../RewardsPage/selectors';
import { getRewardsRequest, deleteRewardRequest } from '../RewardsPage/actions';
import API_URL from '../../api';

export class RewardDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    if (this.props.rewardsState.rewards.length === 0) {
      this.props.dispatch(getRewardsRequest());
    }
    this.state = { dialogOpen: false };
    this.handleDialog = this.handleDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  handleDelete() {
    this.props.dispatch(deleteRewardRequest(this.props.params.rewardID));
  }

  render() {
    const { rewards } = this.props.rewardsState;
    const reward = rewards.find((r) => r.award_auth_token === this.props.params.rewardID);
    const rewardExists = typeof reward !== 'undefined';
    const t = this.props.intl.formatMessage;
    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.cancel} />}
        primary
        onTouchTap={this.handleDialog}
      />,
      <FlatButton
        label={<FormattedMessage {...messages.delete} />}
        primary
        onTouchTap={this.handleDelete}
      />,
    ];

    return (
      <div>
        <Helmet
          title={`Civify | ${reward ? reward.title : 'Reward'}`}
          meta={[
            { name: 'description', content: 'Description of RewardDetailsPage' },
          ]}
        />
        { reward ?
          <Paper
            style={{
              textAlign: 'center',
              width: '100%',
              padding: 30,
              marginTop: 20,
              marginBottom: 20,
              maxWidth: 800,
            }}
            zDepth={4}
            className="mdl-grid"
          >
            <div
              className="mdl-cell mdl-cell--6-col"
              style={{ minWidth: 300 }}
            >
              <CardTitle
                title={rewardExists ? reward.title : 'TITLE'}
                subtitle={<span>
                  <img alt="Coins" src={coinsIcon} height={20} />&nbsp;&nbsp;100
                </span>
                }
                titleStyle={{
                  fontWeight: 'bold',
                  lineHeight: 1.4,
                  marginBottom: 10,
                }}
                subtitleStyle={{ fontSize: 20, marginBottom: 20 }}
              />
              <CardMedia>
                <img
                  alt="Reward"
                  src={`${API_URL}${reward.picture.med_url}`}
                />
              </CardMedia>
            </div>
            <div
              className="mdl-cell mdl-cell--6-col"
              style={{ minWidth: 300 }}
            >
              <CardText>{reward.description}</CardText>
              <b><FormattedMessage {...messages.created} /> <FormattedRelative value={new Date(reward.created_at)} /></b>
              <br />
              <FlatButton
                onClick={this.handleDialog}
                label={<FormattedMessage {...messages.delete} />}
                secondary
                backgroundColor="#E74C3C"
                style={{ marginTop: 30 }}
              />
            </div>
          </Paper> :
          <h2><FormattedMessage {...messages.rewardNotFound} /></h2>}

        <Dialog
          title={t(messages.deleteReward)}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialog}
        >
          <FormattedMessage {...messages.areYouSureDelete} />
        </Dialog>
      </div>
    );
  }
}

RewardDetailsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  rewardsState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rewardsState: makeSelectRewardsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RewardDetailsPage));

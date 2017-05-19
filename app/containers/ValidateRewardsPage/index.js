/*
 *
 * ValidateRewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, CardMedia, RaisedButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import QrReader from 'react-qr-reader';

import makeSelectValidateRewardsPage from './selectors';
import messages from './messages';
import QrCodeIcon from '../../QrCodeIcon';
import {
  validateRequest,
  clearValidation,
} from './actions';

export class ValidateRewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      readerError: null,
      code: null,
    };
    this.handleError = this.handleError.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.clearReward = this.clearReward.bind(this);
  }

  handleError(error) {
    this.setState({ readerError: error });
  }

  handleScan(code) {
    if (!this.state.code && code) {
      this.setState({ code });
      this.props.dispatch(validateRequest(code));
    }
  }

  clearReward() {
    this.setState({ code: null, error: null });
    this.props.dispatch(clearValidation());
  }

  render() {
    const t = this.props.intl.formatMessage;
    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.validateRewards)}`}
          meta={[
            { name: 'description', content: 'Description of RewardDetailsPage' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            width: '100%',
            padding: 30,
            marginTop: 20,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          <h3><FormattedMessage {...messages.validateRewards} /></h3>
          <div className="mdl-grid">
            <br />
            <div
              className="mdl-cell mdl-cell--6-col"
              style={{ minWidth: 300 }}
            >
              <CardMedia>
                <QrReader
                  delay={100}
                  style={{ marginBottom: 40 }}
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
              </CardMedia>
            </div>
            <div
              className="mdl-cell mdl-cell--6-col"
              style={{ minWidth: 300 }}
            >
              <br />
              { this.state.code &&
                <div style={{ fontWeight: 700, fontSize: 20 }}>{ this.state.code }</div> }
              { this.props.validationState.status &&
                <h6
                  style={{
                    borderRadius: 35,
                    backgroundColor: this.props.validationState.status.color,
                    padding: 20,
                    fontSize: 20,
                    color: '#fff',
                    display: 'inline-block',
                  }}
                >
                  { this.props.validationState.status.text }
                </h6>
              }
              <br />
              { this.state.code ?
                <RaisedButton
                  onClick={this.clearReward}
                  label={<FormattedMessage {...messages.validateAnother} />}
                  labelColor="#27ae60"
                  icon={<QrCodeIcon color="#27ae60" />}
                  style={{ marginBottom: 20, color: '#27ae60' }}
                />
              : <h4><br /><FormattedMessage {...messages.pleaseScanACode} /></h4> }
              { this.state.error &&
                <b style={{ color: 'red' }}><FormattedMessage {...messages.error} />: {this.state.error}</b> }
              { this.props.validationState.error &&
                <b style={{ color: 'red' }}><FormattedMessage {...messages.error} />: {this.props.validationState.error}</b> }
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

ValidateRewardsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  validationState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  validationState: makeSelectValidateRewardsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ValidateRewardsPage));

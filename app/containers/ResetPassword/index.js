/*
 *
 * ResetPassword
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Paper } from 'material-ui';
import makeSelectResetPassword from './selectors';
import messages from './messages';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { resetPasswordRequest } from './actions';

export class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const t = this.props.intl.formatMessage;
    const { resetToken } = this.props.params;
    const { error, reset, notFound, invalidToken, expired } = this.props.ResetPassword;
    const { email } = this.props.location.query;
    return (
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Helmet
          title={`Civify | ${t(messages.resetPassword)}`}
          meta={[
            { name: 'description', content: 'Reset your password' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            padding: 35,
            marginTop: 20,
            marginBottom: 20,
          }}
          zDepth={2}
        >
          <h4><FormattedMessage {...messages.resetPassword} /></h4>
          { reset ?
            <FormattedMessage {...messages.successMessage} /> :
            <div>
              <ResetPasswordForm
                onSubmit={(values) => this.props.dispatch(resetPasswordRequest(resetToken, email, values.toJS()))}
              />
              <br />
              { error &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.error} /></strong> }
              { notFound &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.notFound} /></strong> }
              { expired &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.expired} /></strong> }
              { invalidToken &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.invalidToken} /></strong> }
            </div>
          }
        </Paper>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  ResetPassword: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ResetPassword: makeSelectResetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ResetPassword));

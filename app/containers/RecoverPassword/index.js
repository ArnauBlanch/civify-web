/*
 *
 * RecoverPassword
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Paper } from 'material-ui';
import makeSelectRecoverPassword from './selectors';
import messages from './messages';
import RecoverPasswordForm from '../../components/RecoverPasswordForm';
import { recoverPasswordRequest } from './actions';

export class RecoverPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { email: undefined };
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { sent, error, notFound } = this.props.RecoverPassword;
    const { email } = this.state;
    return (
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Helmet
          title={`Civify | ${t(messages.recoverPassword)}`}
          meta={[
            { name: 'description', content: 'Recover your password' },
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
          <h4><FormattedMessage {...messages.recoverPassword} /></h4>
          { sent ?
            <FormattedMessage {...messages.successMessage} values={{ email: <b>{email}</b> }} /> :
            <div>
              <RecoverPasswordForm
                onSubmit={(values) => {
                  const emailValue = values.get('email');
                  this.setState({ email: emailValue });
                  this.props.dispatch(recoverPasswordRequest(emailValue));
                }}
              />
              <br />
              { error &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.error} /></strong> }
              { notFound &&
                <strong style={{ color: 'rgb(244, 67, 54)' }}><FormattedMessage {...messages.notFound} /></strong> }
            </div>
          }
        </Paper>
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  RecoverPassword: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RecoverPassword: makeSelectRecoverPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecoverPassword));

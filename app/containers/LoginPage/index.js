/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Paper, FlatButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import messages from './messages';
import LoginForm from '../../components/LoginForm';
import { loginRequest } from './actions';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
  }

  getErrorMessage() {
    const { loginError } = this.props.loginState;
    if (loginError === 'Invalid credentials') {
      return <FormattedMessage {...messages.wrongPassword} />;
    } else if (loginError === 'User not exists') {
      return <FormattedMessage {...messages.userDoesNotExist} />;
    } else if (loginError === 'No auth token in localStorage') {
      return <FormattedMessage {...messages.thereWasAnError} />;
    } else if (loginError === 'Not a business or admin') {
      return <FormattedMessage {...messages.noPrivileges} />;
    }
    return undefined;
  }

  isEmail(text) {
    return text && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(text);
  }

  handleSubmit(values) {
    this.setState({ open: true });
    const firstField = values.get('usernameOrEmail');
    const user = { password: values.get('password') };
    if (this.isEmail(firstField)) {
      user.email = firstField;
    } else {
      user.username = firstField;
    }
    this.props.dispatch(loginRequest(user));
  }

  render() {
    return (
      <div>
        <Helmet
          title={`Civify | ${this.props.intl.formatMessage(messages.signIn)}`}
          meta={[
            { name: 'description', content: 'Sign into Civify' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            padding: 35,
            width: '100%',
          }}
          zDepth={2}
        >
          <h4 style={{ margin: 0 }}><FormattedMessage {...messages.signIn} /></h4>
          <LoginForm
            onSubmit={this.handleSubmit}
          />
          <br />
          { this.getErrorMessage() &&
            <strong
              style={{ color: 'rgb(244, 67, 54)' }}
            >{this.getErrorMessage()}</strong>}
          <br /><br />
          <FormattedMessage {...messages.notRegisteredBusiness} /><br />
          <FlatButton
            label={this.props.intl.formatMessage(messages.register)}
            primary
            containerElement={<Link to="/register" />}
          />
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loginState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginState: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginPage));

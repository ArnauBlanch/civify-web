/*
 *
 * RegistrationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, CircularProgress } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectRegistrationPage from './selectors';
import { registerRequest, checkUnusedUsername, checkUnusedEmail } from './actions';
import messages from './messages';
import paperStyle from '../../paper.style';
import RegistrationForm from '../../components/RegistrationForm';

export class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.checkUnusedUsername = this.checkUnusedUsername.bind(this);
    this.checkUnusedEmail = this.checkUnusedEmail.bind(this);
  }

  registerUser(values) {
    // this.checkUnusedEmail(values.get('email'));
    // this.checkUnusedUsername(values.get('username'));
    // if (this.props.registerState.unusedUsername && this.props.registerState.unusedEmail) {
    this.props.dispatch(registerRequest({
      name: values.get('name'),
      username: values.get('username'),
      email: values.get('email'),
      password: values.get('password'),
    }));
    // }
  }

  checkUnusedUsername(username) {
    this.props.dispatch(checkUnusedUsername(username));
  }

  checkUnusedEmail(email) {
    this.props.dispatch(checkUnusedEmail(email));
  }

  render() {
    const t = this.props.intl.formatMessage;

    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.businessRegistration)}`}
          meta={[
            { name: 'description', content: 'Register your business in Civify' },
          ]}
        />
        <Paper
          style={paperStyle}
          zDepth={4}
        >
          <h4><FormattedMessage {...messages.businessRegistration} /></h4>
          <RegistrationForm
            onSubmit={this.registerUser}
            unusedUsername={this.props.registerState.unusedUsername}
            unusedEmail={this.props.registerState.unusedEmail}
            checkUsername={this.checkUnusedUsername}
            checkEmail={this.checkUnusedEmail}
            error={this.props.registerState.error}
          />
          { this.props.registerState.currentlySending && <CircularProgress style={{ marginTop: 20 }} size={40} /> }
        </Paper>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  registerState: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  registerState: makeSelectRegistrationPage(),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RegistrationPage));

/*
 *
 * RegistrationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import paperStyle from '../../paperStyle';
import { registerRequest } from './actions';
import RegistrationForm from '../../components/RegistrationForm';

export class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(values) {
    this.props.dispatch(registerRequest({
      name: values.get('name'),
      username: values.get('username'),
      email: values.get('email'),
      password: values.get('password'),
    }));
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
          <RegistrationForm onSubmit={this.registerUser} />
        </Paper>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function select(state) {
  return {
    data: state,
  };
}

export default connect(select, mapDispatchToProps)(injectIntl(RegistrationPage));

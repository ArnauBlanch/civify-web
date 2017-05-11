/*
 *
 * RegistrationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Paper, RaisedButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import messages from './messages';
import paperStyle from '../../paperStyle';
import { registerRequest } from './actions';

export class RegistrationPage extends React.Component {
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  email(value) {
    return (
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        <FormattedMessage {...messages.invalidEmail} /> : undefined
    );
  }

  registerUser(user) {
    const { name, username, email, password } = user;
    this.props.dispatch(registerRequest({ name, username, email, password }));
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
          <form onSubmit={this.props.handleSubmit(this.registerUser)}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText={t(messages.businessName)}
              validate={this.required}
            />
            <Field
              name="username"
              component={TextField}
              floatingLabelText={t(messages.username)}
              validate={[this.required]}
            />
            <Field
              name="email"
              component={TextField}
              floatingLabelText={t(messages.email)}
              validate={[this.required, this.email]}
            />
            <Field
              name="password"
              component={TextField}
              floatingLabelText={t(messages.password)}
              type="password"
              validate={[this.required]}
            />
            <Field
              name="password_confirmation"
              component={TextField}
              floatingLabelText={t(messages.confirmPassword)}
              type="password"
              validate={[this.required]}
            />
            <br /><br />
            <RaisedButton
              label={t(messages.submit)}
              primary
              type="submit"
            />
          </form>
        </Paper>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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

export default reduxForm({ form: 'registerForm' })(
connect(select, mapDispatchToProps)(injectIntl(RegistrationPage)));

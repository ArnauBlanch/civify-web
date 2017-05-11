/**
*
* RegisterForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class RegistrationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  email(value) {
    return (
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        <FormattedMessage {...messages.invalidEmail} /> : undefined
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.businessName} />}
          validate={this.required}
        />
        <Field
          name="username"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.username} />}
          validate={[this.required]}
        />
        <Field
          name="email"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.email} />}
          validate={[this.required, this.email]}
        />
        <Field
          name="password"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.password} />}
          type="password"
          validate={[this.required]}
        />
        <Field
          name="password_confirmation"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.confirmPassword} />}
          type="password"
          validate={[this.required]}
        />
        <br /><br />
        <RaisedButton
          label={<FormattedMessage {...messages.submit} />}
          primary
          type="submit"
        />
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'registrationForm' })(RegistrationForm);

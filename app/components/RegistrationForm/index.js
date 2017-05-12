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

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.username = this.username.bind(this);
    this.email = this.email.bind(this);
  }

  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  email(value) {
    if (value && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value)) {
      return <FormattedMessage {...messages.invalidEmail} />;
    }
    return (this.props.unusedEmail && <FormattedMessage {...messages.usedEmail} />) || undefined;
  }

  username(value) {
    if (value && !/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g.test(value)) {
      return <FormattedMessage {...messages.invalidUsername} />;
    }
    return (this.props.unusedUsername && <FormattedMessage {...messages.usedUsername} />) || undefined;
  }

  password(value) {
    return (
      value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@&#$%]{8,40}$/g.test(value) ?
        <FormattedMessage {...messages.invalidPassword} /> : undefined
    );
  }

  matchPassword(value, allValues) {
    return (
      value && (value !== allValues.get('password')) ?
        <FormattedMessage {...messages.passwordsDoNoMatch} /> : undefined
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
          validate={[this.required, this.username]}
          onChange={(e) => this.props.checkUsername(e.target.value)}
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
          validate={[this.required, this.password]}
        />
        <Field
          name="password_confirmation"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.confirmPassword} />}
          type="password"
          validate={[this.required, this.matchPassword]}
        />
        <br /><br />
        <RaisedButton
          label={
            <span style={{ height: '25px', width: '25px' }}>
              <FormattedMessage {...messages.submit} />
            </span>
          }
          primary
          type="submit"
        />
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  unusedUsername: PropTypes.bool.isRequired,
  unusedEmail: PropTypes.bool.isRequired,
  checkUsername: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'registrationForm' })(RegistrationForm);

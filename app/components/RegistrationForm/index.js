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
    this.validUsername = this.validUsername.bind(this);
    this.requiredUsername = this.requiredUsername.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.requiredEmail = this.requiredEmail.bind(this);
    this.state = {
      usernameTouched: false,
      emailTouched: false,
      validUsername: undefined,
      validEmail: undefined,
    };
  }

  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  requiredUsername(username) {
    const errorMessage = username ?
                         undefined : <FormattedMessage {...messages.requiredField} />;
    this.setState({ requiredUsername: errorMessage });
    return errorMessage;
  }

  requiredEmail(email) {
    const errorMessage = email ?
                         undefined : <FormattedMessage {...messages.requiredField} />;
    this.setState({ requiredEmail: errorMessage });
    return errorMessage;
  }

  validEmail(value) {
    const errorMessage = value && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value) ?
                         undefined : <FormattedMessage {...messages.invalidEmail} />;
    this.setState({ validEmail: errorMessage });
    return errorMessage;
  }

  validUsername(value) {
    const errorMessage = value && /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g.test(value) ?
      undefined : <FormattedMessage {...messages.invalidUsername} />;
    this.setState({ validUsername: errorMessage });
    return errorMessage;
  }

  validPassword(value) {
    return (
      value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@&#$%]{8,40}$/g.test(value) ?
        <FormattedMessage {...messages.invalidPassword} /> : undefined
    );
  }

  matchingPasswords(value, allValues) {
    return (
      value && (value === allValues.get('password')) ?
      undefined : <FormattedMessage {...messages.passwordsDoNoMatch} />
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
          validate={[this.requiredUsername, this.validUsername]}
          errorText={this.state.usernameTouched &&
            (this.state.requiredUsername || this.state.validUsername ||
              (!this.props.unusedUsername && <FormattedMessage {...messages.usedUsername} />)
            || undefined)}
          onChange={(e) => {
            this.setState({ usernameTouched: true });
            if (e.target.value && /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g.test(e.target.value)) {
              this.props.checkUsername(e.target.value);
            }
          }}
        />
        <Field
          name="email"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.email} />}
          validate={[this.requiredEmail, this.validEmail]}
          errorText={this.state.emailTouched &&
            (this.state.requiredEmail || this.state.validEmail ||
              (!this.props.unusedEmail && <FormattedMessage {...messages.usedEmail} />) || undefined)}
          onChange={(e) => {
            this.setState({ emailTouched: true });
            if (e.target.value && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(e.target.value)) {
              this.props.checkEmail(e.target.value);
            }
          }}
        />
        <Field
          name="password"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.password} />}
          type="password"
          validate={[this.required, this.validPassword]}
        />
        <Field
          name="password_confirmation"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.confirmPassword} />}
          type="password"
          validate={[this.required, this.matchingPasswords]}
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
  checkEmail: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'registrationForm' })(RegistrationForm);

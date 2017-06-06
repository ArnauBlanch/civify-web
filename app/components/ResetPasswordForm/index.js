/**
*
* ResetPasswordForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
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
          name="password"
          type="password"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.password} />}
          validate={[this.required, this.validPassword]}
        />
        <Field
          name="password_confirmation"
          type="password"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.confirmPassword} />}
          validate={[this.required, this.matchingPasswords]}
        />
        <br /><br />
        <RaisedButton
          label={
            <FormattedMessage {...messages.submit} />
          }
          primary
          type="submit"
        />
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'resetPasswordForm' })(ResetPasswordForm);

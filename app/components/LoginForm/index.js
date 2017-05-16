/**
*
* LoginForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class LoginForm extends React.Component {

  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="usernameOrEmail"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.usernameOrEmail} />}
          validate={this.required}
        /><br />
        <Field
          name="password"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.password} />}
          type="password"
          validate={this.required}
        />
        <br /><br />
        <RaisedButton
          label={
            <FormattedMessage {...messages.signIn} />
          }
          primary
          type="submit"
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'loginForm' })(LoginForm);

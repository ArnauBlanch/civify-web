/**
*
* RecoverPasswordForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class RecoverPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.requiredField} />);
  }

  validEmail(value) {
    return value && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value) ?
      undefined : <FormattedMessage {...messages.invalidEmail} />;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="email"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.email} />}
          validate={[this.required, this.validEmail]}
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

RecoverPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'recoverPasswordForm' })(RecoverPasswordForm);

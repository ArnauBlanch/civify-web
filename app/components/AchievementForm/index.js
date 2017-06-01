/**
*
* RegisterForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton, MenuItem } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField, SelectField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const types = [
  { value: 'issue', text: <FormattedMessage {...messages.createIssues} /> },
  { value: 'confirm', text: <FormattedMessage {...messages.confirmIssues} /> },
  { value: 'resolve', text: <FormattedMessage {...messages.resolveIssues} /> },
  { value: 'reward', text: <FormattedMessage {...messages.getRewards} /> },
  { value: 'use', text: <FormattedMessage {...messages.useRewards} /> },
  { value: 'confirm_received', text: <FormattedMessage {...messages.receiveConfirmations} /> },
  { value: 'resolve_received', text: <FormattedMessage {...messages.receiveResolutions} /> },
  { value: 'coins_spent', text: <FormattedMessage {...messages.spendCoins} /> },
  { value: 'issues_resolved', text: <FormattedMessage {...messages.issuesResolved} /> },
  { value: 'level', text: <FormattedMessage {...messages.reachLevel} /> },
];

class AchievementForm extends React.Component {
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.required} />);
  }
  numberCheck(value) {
    return /^\d+$/.test(value) && value > 0 ?
    undefined : <FormattedMessage {...messages.invalidNumber} />;
  }

  render() {
    return (
      <form
        style={{ marginLeft: 80, marginRight: 80, textAlign: 'center' }}
        onSubmit={this.props.handleSubmit}
      >
        <Field
          name="title"
          component={TextField}
          style={{ width: '100%' }}
          floatingLabelText={<FormattedMessage {...messages.title} />}
          validate={this.required}
        /><br />
        <Field
          name="description"
          component={TextField}
          style={{ width: '100%', textAlign: 'left' }}
          errorStyle={{ textAlign: 'center' }}
          floatingLabelText={<FormattedMessage {...messages.description} />}
          validate={this.required}
          multiLine
          rows={2}
        /><br />
        <Field
          name="coins"
          type="number" min="1"
          component={TextField}
          style={{ width: '100%' }}
          floatingLabelText={<FormattedMessage {...messages.coins} />}
          validate={[this.required, this.numberCheck]}
        /><br />
        <Field
          name="xp"
          type="number" min="1"
          component={TextField}
          style={{ width: '100%' }}
          floatingLabelText={<FormattedMessage {...messages.xp} />}
          validate={[this.required, this.numberCheck]}
        /><br />
        <div>
          <Field
            name="number"
            type="number" min="1"
            component={TextField}
            style={{ width: '17%' }}
            floatingLabelText={<FormattedMessage {...messages.goal} />}
            validate={[this.required, this.numberCheck]}
          />
          <Field
            name="kind"
            component={SelectField}
            floatingLabelText={<FormattedMessage {...messages.type} />}
            style={{ width: '80%', textAlign: 'left', float: 'right' }}
            selectedMenuItemStyle={{ color: '#888' }}
            errorStyle={{ textAlign: 'center' }}
            validate={this.required}
          >
            { types.map((type) => <MenuItem key={type.value} value={type.value} primaryText={type.text} />)
            }
          </Field>
        </div>
        <div style={{ textAlign: 'center' }}>
          { this.props.achievementError
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.thereWasAnError} /></span> }
          { this.props.alreadyExists
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.alreadyExists} /></span> }
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
        </div>
      </form>
    );
  }
}

AchievementForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  achievementError: PropTypes.bool.isRequired,
  alreadyExists: PropTypes.bool.isRequired,
};

export default reduxForm({ form: 'achievementForm' })(AchievementForm);

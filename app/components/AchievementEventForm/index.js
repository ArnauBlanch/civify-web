/**
*
* AchievementEventorm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton, MenuItem } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField, SelectField, DatePicker, TimePicker } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { renderDropzoneInput } from '../RewardForm';

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

export const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!

  const yy = date.getFullYear() % 100;
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}-${mm}-${yy}`;
};

class AchievementEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileChanged = this.fileChanged.bind(this);
    this.state = {
      file: undefined,
      fileChanged: false,
    };
  }

  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.required} />);
  }

  numberCheck(value) {
    return /^\d+$/.test(value) && value > 0 ?
    undefined : <FormattedMessage {...messages.invalidNumber} />;
  }

  fileChanged(e) {
    this.setState({ file: e[0], fileChanged: true });
  }

  render() {
    const { aeError, alreadyExists, datesError, isEvent, missingFile, imageError } = this.props;
    const { fileChanged } = this.state;
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
        />
        <div>
          <Field
            name="startDate"
            component={DatePicker}
            formatDate={formatDate}
            DateTimeFormat={global.Intl.DateTimeFormat}
            locale={this.props.lang}
            format={null}
            textFieldStyle={{ width: '55%', float: 'left' }}
            floatingLabelText={<FormattedMessage {...messages.startDate} />}
            validate={this.required}
            cancelLabel={<FormattedMessage {...messages.cancel} />}
          />
          <Field
            name="startTime"
            component={TimePicker}
            format={null}
            props={{ format: '24hr' }}
            textFieldStyle={{ width: '40%', float: 'right' }}
            floatingLabelText={<FormattedMessage {...messages.startTime} />}
            cancelLabel={<FormattedMessage {...messages.cancel} />}
          />
        </div>
        <div>
          <Field
            name="endDate"
            component={DatePicker}
            formatDate={formatDate}
            format={null}
            DateTimeFormat={global.Intl.DateTimeFormat}
            locale={this.props.lang}
            textFieldStyle={{ width: '55%', float: 'left' }}
            floatingLabelText={<FormattedMessage {...messages.endDate} />}
            validate={this.required}
            cancelLabel={<FormattedMessage {...messages.cancel} />}
          />
          <Field
            name="endTime"
            component={TimePicker}
            format={null}
            props={{ format: '24hr' }}
            textFieldStyle={{ width: '40%', float: 'right' }}
            floatingLabelText={<FormattedMessage {...messages.endTime} />}
            cancelLabel={<FormattedMessage {...messages.cancel} />}
          />
        </div>
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
          </Field><br />
          <Field
            name="image"
            component={renderDropzoneInput}
            onChange={this.fileChanged}
            onFocus={this.fileChanged}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          { isEvent && missingFile && !fileChanged
            && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.required} /></span> }
          { isEvent && imageError
            && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.invalidImage} /></span> }
          { aeError && !datesError
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.thereWasAnError} /></span> }
          { aeError && datesError
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.invalidDates} /></span> }
          { alreadyExists
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

AchievementEventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  aeError: PropTypes.bool.isRequired,
  datesError: PropTypes.bool,
  alreadyExists: PropTypes.bool.isRequired,
  isEvent: PropTypes.bool,
  missingFile: PropTypes.bool,
  imageError: PropTypes.bool,
  lang: PropTypes.string,
};

export default reduxForm({ form: 'achievementEventForm' })(AchievementEventForm);

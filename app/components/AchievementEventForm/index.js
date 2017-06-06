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

const eventTypes = [
  { value: 'issue', text: <FormattedMessage {...messages.createIssues} /> },
  { value: 'confirm', text: <FormattedMessage {...messages.confirmIssues} /> },
  { value: 'resolve', text: <FormattedMessage {...messages.resolveIssues} /> },
];

const achievementTypes = [
  ...eventTypes,
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

  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}-${mm}-${yyyy}`;
};

class AchievementEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.imageChanged = this.imageChanged.bind(this);
    this.badgeChanged = this.badgeChanged.bind(this);
    this.state = {
      imageFile: undefined,
      badgeFile: undefined,
      imageChanged: false,
      badgeChanged: false,
    };
  }

  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.required} />);
  }

  numberCheck(value) {
    return /^\d+$/.test(value) && value > 0 ?
    undefined : <FormattedMessage {...messages.invalidNumber} />;
  }

  imageChanged(e) {
    this.setState({ imageFile: e[0], imageChanged: true });
  }
  badgeChanged(e) {
    this.setState({ badgeFile: e[0], badgeChanged: true });
  }

  render() {
    const { aeError, alreadyExists, datesError, isEvent,
      missingImage, missingBadge, imageError, badgeError, initialValues } = this.props;
    const { imageChanged, badgeChanged } = this.state;
    console.log(this.state);
    console.log(this.props);
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
        { isEvent && <div>
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
        </div> }
        { isEvent && <div>
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
        </div> }
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
            { (isEvent ? eventTypes : achievementTypes).map((type) => <MenuItem key={type.value} value={type.value} primaryText={type.text} />)
            }
          </Field><br />
        </div>
        { isEvent && <div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10, marginBottom: -15 }}>
            <FormattedMessage {...messages.picture} />
          </div>
          <Field
            name="image"
            component={renderDropzoneInput}
            onChange={this.imageChanged}
            onFocus={this.imageChanged}
            currentImage={
              typeof initialValues !== 'undefined' ?
              initialValues.get('picture').toJS() : undefined
            }
          />
          <div style={{ textAlign: 'center' }}>
            { isEvent && missingImage && !imageChanged
              && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.required} /></span> }
            { isEvent && imageError
              && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.invalidImage} /></span> }
          </div>
        </div>
        }
        <Field
          name="badge_title"
          component={TextField}
          style={{ width: '100%' }}
          floatingLabelText={<FormattedMessage {...messages.badgeTitle} />}
          validate={this.required}
        /><br />
        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10, marginBottom: -15 }}>
          <FormattedMessage {...messages.badgePicture} />
        </div>
        <Field
          name="badge_image"
          component={renderDropzoneInput}
          onChange={this.badgeChanged}
          onFocus={this.badgeChanged}
          currentImage={
            typeof initialValues !== 'undefined' ?
            initialValues.get('badge').toJS() : undefined
          }
        />
        <div style={{ textAlign: 'center' }}>
          { missingBadge && !badgeChanged
            && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.required} /></span> }
          { isEvent && badgeError
            && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.invalidImage} /></span> }
          { aeError && (typeof datesError === 'undefined' || !datesError)
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.thereWasAnError} /></span> }
          { aeError && (typeof datesError !== 'undefined' && datesError)
            && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.invalidDates} /></span> }
          { alreadyExists
            && <span style={{ color: 'red', fontSize: 14 }}>
              { isEvent ? <FormattedMessage {...messages.eventAlreadyExists} />
                : <FormattedMessage {...messages.achievementAlreadyExists} /> }
            </span> }
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
  aeError: PropTypes.bool,
  datesError: PropTypes.bool,
  alreadyExists: PropTypes.bool,
  isEvent: PropTypes.bool,
  missingImage: PropTypes.bool,
  missingBadge: PropTypes.bool,
  imageError: PropTypes.bool,
  badgeError: PropTypes.bool,
  lang: PropTypes.string,
  initialValues: PropTypes.object,
};

export default reduxForm({ form: 'achievementEventForm' })(AchievementEventForm);

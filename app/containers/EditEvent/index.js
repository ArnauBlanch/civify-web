/*
 *
 * EditEvent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Card, CircularProgress } from 'material-ui';
import makeSelectEditEvent from './selectors';
import messages from './messages';
import AchievementEventForm, { formatDate } from '../../components/AchievementEventForm';
import { getEventRequest, editEventRequest } from './actions';
import { makeSelectLanguage } from '../App/selectors';
import { formatTime } from '../CreateEvent';

const addValueIfChanged = (oldValues, newValues, name, values) => {
  const aux = newValues;
  if (oldValues[name] != values[name]) { // eslint-disable-line
    aux[name] = values[name];
  }
  return aux;
};

const addImage = (newValues, name, values, image) => {
  const aux = newValues;
  const valueName = name === 'picture' ? 'image' : 'badge_image';
  if (typeof values.get(valueName) !== 'undefined') {
    const newImage = {
      content: image,
      filename: values.get(valueName)[0].name,
      content_type: values.get(valueName)[0].type,
    };
    aux[name] = newImage;
  }
  return aux;
};

const addDateIfChanged = (oldValues, newValues, name, date, time) => {
  const aux = newValues;
  const defaultTime = name === 'start_date' ? '00:00:00' : '23:59:59';
  const auxTime = typeof time !== 'undefined' ? formatTime(time) : defaultTime;
  if (oldValues[name] !== `${formatDate(date)} ${auxTime}`) {
    aux[name] = `${formatDate(date)} ${auxTime}`;
  }
  return aux;
};

export class EditEvent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendEvent = this.sendEvent.bind(this);
    this.state = {
      missingBadgeImage: false,
      badgeError: false,
      badgeImage: undefined,
      imageError: false,
      image: undefined,
    };
  }

  componentWillMount() {
    this.props.dispatch(getEventRequest(this.props.params.eventID));
  }

  onSubmit(values) {
    if (typeof values.get('badge_image') !== 'undefined') {
      const badgeReader = new FileReader();
      badgeReader.readAsDataURL(values.get('badge_image')[0]);
      badgeReader.onload = () => {
        this.setState({ badgeImage: badgeReader.result.split(',')[1] });
        this.sendEvent(values);
      };
      badgeReader.onError = () => this.setState({ badgeError: true });
    }
    if (typeof values.get('image') !== 'undefined') {
      const reader = new FileReader();
      reader.readAsDataURL(values.get('image')[0]);
      reader.onload = () => {
        this.setState({ image: reader.result.split(',')[1] });
        this.sendEvent(values);
      };
      reader.onError = () => this.setState({ imageError: true });
    }
    if (typeof values.get('badge_image') === 'undefined' &&
        typeof values.get('image') === 'undefined') {
      this.sendEvent(values);
    }
  }

  sendEvent(values) {
    let valuesCount = 0;
    if (typeof values.get('badge_image') !== 'undefined') valuesCount += 1;
    if (typeof values.get('image') !== 'undefined') valuesCount += 1;

    let stateCount = 0;
    if (typeof this.state.badgeImage !== 'undefined') stateCount += 1;
    if (typeof this.state.image !== 'undefined') stateCount += 1;
    if (valuesCount === stateCount) {
      const valuesJs = values.toJS();
      this.setState({ imageError: false, badgeError: false });
      let newValues = {};
      const oldValues = this.props.EditEvent.event;
      newValues = addValueIfChanged(oldValues, newValues, 'title', valuesJs);
      newValues = addValueIfChanged(oldValues, newValues, 'description', valuesJs);
      newValues = addValueIfChanged(oldValues, newValues, 'kind', valuesJs);
      newValues = addValueIfChanged(oldValues, newValues, 'number', valuesJs);
      newValues = addValueIfChanged(oldValues, newValues, 'coins', valuesJs);
      newValues = addValueIfChanged(oldValues, newValues, 'xp', valuesJs);
      newValues = addDateIfChanged(oldValues, newValues, 'start_date', valuesJs.startDate, valuesJs.startTime);
      newValues = addDateIfChanged(oldValues, newValues, 'end_date', valuesJs.endDate, valuesJs.endTime);
      newValues = addImage(newValues, 'picture', values, this.state.image);
      newValues = addImage(newValues, 'badge', values, this.state.badgeImage);
      if (oldValues.badge.title !== valuesJs.badge_title) {
        if (typeof newValues.badge === 'undefined') newValues.badge = {};
        newValues.badge.title = valuesJs.badge_title;
      }

      this.props.dispatch(editEventRequest(this.props.params.eventID, newValues, true));
    }
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { eventID } = this.props.params;
    const { getError, editError, currentlySending,
      event, datesError, alreadyExists } = this.props.EditEvent;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 20 }}>
        <Helmet
          title={`Civify | ${t(messages.title)}`}
          meta={[
            { name: 'description', content: 'Description of EditEvent' },
          ]}
        />
        { typeof event === 'undefined' || event.event_token !== eventID ?
          <div style={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress style={{ marginTop: 20 }} size={40} />
          </div>
          :
          <Card style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 20 }}>
            <h4 style={{ textAlign: 'center' }}><FormattedMessage {...messages.title} /></h4>
            <AchievementEventForm
              onSubmit={this.onSubmit}
              isEditing
              isEvent
              lang={this.props.lang}
              imageError={this.state.imageError}
              badgeError={this.state.badgeError}
              datesError={datesError}
              alreadyExists={alreadyExists}
              aeError={editError}
              initialValues={{
                badge_title: event.badge.title,
                startDate: new Date(event.start_date),
                startTime: new Date(event.start_date),
                endDate: new Date(event.end_date),
                endTime: new Date(event.end_date),
                ...event,
              }}
            />
            <div style={{ width: '100%', textAlign: 'center', marginTop: 10 }}>
              { getError
                && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.getError} /></span> }
              { currentlySending && <CircularProgress style={{ marginTop: 20 }} size={40} /> }
            </div>
          </Card>
        }
      </div>
    );
  }
}

EditEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  params: PropTypes.object.isRequired,
  EditEvent: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditEvent: makeSelectEditEvent(),
  lang: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditEvent));

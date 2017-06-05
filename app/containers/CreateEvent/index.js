/*
 *
 * CreateEvent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Card, CircularProgress } from 'material-ui';
import makeSelectCreateEvent from './selectors';
import messages from './messages';
import AchievementEventForm, { formatDate } from '../../components/AchievementEventForm';
import { createEventRequest } from './actions';
import { makeSelectLanguage } from '../App/selectors';

const formatTime = (time) => {
  const hh = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${hh}:${mm}:00`;
};

export class CreateEvent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendEvent = this.sendEvent.bind(this);
    this.state = {
      missingImage: false,
      missingBadgeImage: false,
      imageError: false,
      badgeError: false,
      image: undefined,
      badgeImage: undefined,
    };
  }

  onSubmit(values) {
    if (typeof values.get('image') === 'undefined') {
      this.setState({ missingImage: true });
    }
    if (typeof values.get('badge_image') === 'undefined') {
      this.setState({ missingBadgeImage: true });
    }
    if (typeof values.get('image') !== 'undefined' &&
        typeof values.get('badge_image') !== 'undefined') {
      const reader = new FileReader();
      reader.readAsDataURL(values.get('image')[0]);
      reader.onload = () => {
        this.setState({ image: reader.result.split(',')[1] });
        this.sendEvent(values);
      };
      reader.onError = () => this.setState({ imageError: true });
      const badgeReader = new FileReader();
      badgeReader.readAsDataURL(values.get('badge_image')[0]);
      badgeReader.onload = () => {
        this.setState({ badgeImage: badgeReader.result.split(',')[1] });
        this.sendEvent(values);
      };
      badgeReader.onError = () => this.setState({ badgeError: true });
    }
  }

  sendEvent(values) {
    if (typeof this.state.image !== 'undefined' &&
        typeof this.state.badgeImage !== 'undefined') {
      const valuesJs = values.toJS();
      this.setState({ imageError: false, badgeError: false });
      const startTime = typeof valuesJs.startTime !== 'undefined' ?
        formatTime(valuesJs.startTime) : '00:00:00';
      const endTime = typeof valuesJs.endTime !== 'undefined' ?
        formatTime(valuesJs.endTime) : '23:59:59';
      const event = {
        title: valuesJs.title,
        description: valuesJs.description,
        kind: valuesJs.kind,
        number: valuesJs.number,
        coins: valuesJs.coins,
        xp: valuesJs.xp,
        start_date: `${formatDate(valuesJs.startDate)} ${startTime}`,
        end_date: `${formatDate(valuesJs.endDate)} ${endTime}`,
        image: {
          content: this.state.image,
          filename: values.get('image')[0].name,
          content_type: values.get('image')[0].type,
        },
        badge: {
          title: valuesJs.badge_title,
          content: this.state.badgeImage,
          filename: values.get('badge_image')[0].name,
          content_type: values.get('badge_image')[0].type,
        },
      };
      this.props.dispatch(createEventRequest(event));
    }
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { eventError, currentlySending, alreadyExists, datesError } = this.props.CreateEvent;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 5 }}>
        <Helmet
          title={`Civify | ${t(messages.title)}`}
          meta={[
            { name: 'description', content: 'Description of CreateEvent' },
          ]}
        />
        <Card style={{ paddingTop: 10, paddingBottom: 30 }}>
          <h4 style={{ textAlign: 'center' }}><FormattedMessage {...messages.title} /></h4>
          <AchievementEventForm
            onSubmit={this.onSubmit}
            aeError={eventError}
            alreadyExists={alreadyExists}
            isEvent
            lang={this.props.lang}
            missingImage={this.state.missingImage}
            missingBadge={this.state.missingBadgeImage}
            imageError={this.state.imageError}
            badgeError={this.state.badgeError}
            datesError={datesError}
          />
          { currentlySending &&
            <CircularProgress style={{ marginTop: 20 }} size={40} /> }
        </Card>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  CreateEvent: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CreateEvent: makeSelectCreateEvent(),
  lang: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateEvent));

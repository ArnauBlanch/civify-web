/*
 *
 * EditAchievement
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Card, CircularProgress } from 'material-ui';
import makeSelectEditAchievement from './selectors';
import messages from './messages';
import AchievementEventForm from '../../components/AchievementEventForm';
import { getAchievementRequest, editAchievementRequest } from './actions';
import { makeSelectLanguage } from '../App/selectors';

const addValueIfChanged = (oldValues, newValues, name, values) => {
  const aux = newValues;
  if (oldValues[name] != values[name]) { // eslint-disable-line
    aux[name] = values[name];
  }
  return aux;
};

export class EditAchievement extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendAchievement = this.sendAchievement.bind(this);
    this.state = {
      missingBadgeImage: false,
      badgeError: false,
      badgeImage: undefined,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAchievementRequest(this.props.params.achievementID));
  }

  onSubmit(values) {
    if (typeof values.get('badge_image') !== 'undefined') {
      const badgeReader = new FileReader();
      badgeReader.readAsDataURL(values.get('badge_image')[0]);
      badgeReader.onload = () => {
        this.setState({ badgeImage: badgeReader.result.split(',')[1] });
        this.sendAchievement(values);
      };
      badgeReader.onError = () => this.setState({ badgeError: true });
    } else {
      this.sendAchievement(values);
    }
  }

  sendAchievement(values) {
    const valuesJs = values.toJS();
    this.setState({ badgeError: false });
    let newValues = {};
    const oldValues = this.props.EditAchievement.achievement;
    newValues = addValueIfChanged(oldValues, newValues, 'title', valuesJs);
    newValues = addValueIfChanged(oldValues, newValues, 'description', valuesJs);
    newValues = addValueIfChanged(oldValues, newValues, 'kind', valuesJs);
    newValues = addValueIfChanged(oldValues, newValues, 'number', valuesJs);
    newValues = addValueIfChanged(oldValues, newValues, 'coins', valuesJs);
    newValues = addValueIfChanged(oldValues, newValues, 'xp', valuesJs);
    if (this.state.badgeImage) {
      const newBadge = {
        content: this.state.badgeImage,
        filename: values.get('badge_image')[0].name,
        content_type: values.get('badge_image')[0].type,
      };
      newValues.badge = newBadge;
    }
    if (oldValues.badge.title !== valuesJs.badge_title) {
      if (typeof newValues.badge === 'undefined') {
        newValues.badge = {};
      }
      newValues.badge.title = valuesJs.badge_title;
    }
    this.props.dispatch(editAchievementRequest(
      this.props.params.achievementID, newValues, true));
  }
  render() {
    const t = this.props.intl.formatMessage;
    const { getError, editError, currentlySending, achievement } = this.props.EditAchievement;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 20 }}>
        <Helmet
          title={`Civify | ${t(messages.title)}`}
          meta={[
            { name: 'description', content: 'Description of EditAchievement' },
          ]}
        />
        { typeof achievement === 'undefined' ?
          <div style={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress style={{ marginTop: 20 }} size={40} />
          </div>
          :
          <Card style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 20 }}>
            <h4 style={{ textAlign: 'center' }}><FormattedMessage {...messages.title} /></h4>
            <AchievementEventForm
              onSubmit={this.onSubmit}
              isEditing
              initialValues={{
                badge_title: achievement.badge.title,
                ...achievement,
              }}
            />
            <div style={{ width: '100%', textAlign: 'center', marginTop: 10 }}>
              { getError
                && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.getError} /></span> }
              { editError
                && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.editError} /></span> }
              { currentlySending && <CircularProgress style={{ marginTop: 20 }} size={40} /> }
            </div>
          </Card>
        }
      </div>
    );
  }
}

EditAchievement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  params: PropTypes.object.isRequired,
  EditAchievement: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditAchievement: makeSelectEditAchievement(),
  lang: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditAchievement));

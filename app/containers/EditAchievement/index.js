/*
 *
 * CreateAchievement
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Card, CircularProgress } from 'material-ui';
import makeSelectCreateAchievement from './selectors';
import messages from './messages';
import AchievementEventForm from '../../components/AchievementEventForm';
import { createAchievementRequest } from './actions';
import { makeSelectLanguage } from '../App/selectors';

export class CreateAchievement extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
  onSubmit(values) {
    if (typeof values.get('badge_image') === 'undefined') {
      this.setState({ missingBadgeImage: true });
    }
    if (typeof values.get('badge_image') !== 'undefined') {
      const badgeReader = new FileReader();
      badgeReader.readAsDataURL(values.get('badge_image')[0]);
      badgeReader.onload = () => {
        this.setState({ badgeImage: badgeReader.result.split(',')[1] });
        this.sendAchievement(values);
      };
      badgeReader.onError = () => this.setState({ badgeError: true });
    }
  }

  sendAchievement(values) {
    if (typeof this.state.badgeImage !== 'undefined') {
      const valuesJs = values.toJS();
      this.setState({ badgeError: false });
      const achievement = {
        title: valuesJs.title,
        description: valuesJs.description,
        kind: valuesJs.kind,
        number: valuesJs.number,
        coins: valuesJs.coins,
        xp: valuesJs.xp,
        badge: {
          title: valuesJs.badge_title,
          content: this.state.badgeImage,
          filename: values.get('badge_image')[0].name,
          content_type: values.get('badge_image')[0].type,
        },
      };
      this.props.dispatch(createAchievementRequest(achievement));
    }
  }
  render() {
    const t = this.props.intl.formatMessage;
    const { achievementError, currentlySending, alreadyExists } = this.props.CreateAchievement;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 20 }}>
        <Helmet
          title={`Civify | ${t(messages.title)}`}
          meta={[
            { name: 'description', content: 'Description of CreateAchievement' },
          ]}
        />
        <Card style={{ paddingTop: 10, paddingBottom: 30 }}>
          <h4 style={{ textAlign: 'center' }}><FormattedMessage {...messages.title} /></h4>
          <AchievementEventForm
            onSubmit={this.onSubmit}
            error={achievementError}
            alreadyExists={alreadyExists}
          />
          { currentlySending &&
            <div style={{ width: '100%', textAlign: 'center' }}>
              <CircularProgress style={{ marginTop: 20 }} size={40} />
            </div> }
        </Card>
      </div>
    );
  }
}

CreateAchievement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  CreateAchievement: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CreateAchievement: makeSelectCreateAchievement(),
  lang: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateAchievement));

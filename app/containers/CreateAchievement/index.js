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
  }
  onSubmit(values) {
    this.props.dispatch(createAchievementRequest(values.toJS()));
  }
  render() {
    const t = this.props.intl.formatMessage;
    const { achievementError, currentlySending, alreadyExists } = this.props.CreateAchievement;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 5 }}>
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
            <CircularProgress style={{ marginTop: 20 }} size={40} /> }
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

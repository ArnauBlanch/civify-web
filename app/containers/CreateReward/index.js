/*
 *
 * CreateReward
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import { Paper, CircularProgress } from 'material-ui';
import { createStructuredSelector } from 'reselect';

import makeSelectCreateReward from './selectors';
import messages from './messages';
import RewardForm from '../../components/RewardForm';
import { createRewardRequest } from './actions';

export class CreateReward extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendReward = this.sendReward.bind(this);
    this.state = {
      missingFile: false,
      imageError: false,
    };
  }

  onSubmit(values) {
    if (typeof values.get('picture') === 'undefined') {
      this.setState({ missingFile: true });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(values.get('picture')[0]);
      reader.onload = () => this.sendReward(values, reader.result.split(',')[1]);
      reader.onError = () => this.setState({ imageError: true });
    }
  }

  sendReward(values, base64image) {
    this.setState({ imageError: false });
    const reward = {
      title: values.get('title'),
      description: values.get('description'),
      price: values.get('price'),
      picture: {
        filename: values.get('picture')[0].name,
        content_type: values.get('picture')[0].type,
        content: base64image,
      },
    };
    this.props.dispatch(createRewardRequest(reward));
  }

  render() {
    const t = this.props.intl.formatMessage;
    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.title)}`}
          meta={[
            { name: 'description', content: 'Create new reward' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            padding: 35,
            width: '100%',
            paddingLeft: 100,
            paddingRight: 100,
          }}
          zDepth={4}
        >
          <h4><FormattedMessage {...messages.title} /></h4>
          <RewardForm
            onSubmit={this.onSubmit}
            missingFile={this.state.missingFile}
            imageError={this.state.imageError}
            rewardError={this.props.CreateReward.rewardError}
          />
          { this.props.CreateReward.currentlySending &&
            <CircularProgress style={{ marginTop: 20 }} size={40} /> }
        </Paper>
      </div>
    );
  }
}

CreateReward.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  CreateReward: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CreateReward: makeSelectCreateReward(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateReward));

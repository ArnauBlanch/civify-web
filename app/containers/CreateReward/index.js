/*
 *
 * CreateReward
 *
 */

import React/* , { PropTypes }*/ from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import { Paper } from 'material-ui';
import { createStructuredSelector } from 'reselect';

import makeSelectCreateReward from './selectors';
import messages from './messages';
import RewardForm from '../../components/RewardForm';

export class CreateReward extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { missingFile: false };
  }
  onSubmit(values) {
    if (!values.get('image')) {
      this.setState({ missingFile: true });
    }
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
          />
        </Paper>
      </div>
    );
  }
}

CreateReward.propTypes = {
//  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
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

/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Paper, FlatButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import messages from './messages';
import paperStyle from '../../paperStyle';

const registerStyle = {
  marginLeft: 10,
  verticalAlign: 'middle',
};

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title={`Civify | ${this.props.intl.formatMessage(messages.login)}`}
          meta={[
            { name: 'description', content: 'Log into Civify' },
          ]}
        />
        <Paper
          style={paperStyle}
          zDepth={2}
        >
          <h4 style={{ margin: 0 }}><FormattedMessage {...messages.login} /></h4>
          <br /><br /><br />
          <FormattedMessage {...messages.notRegisteredBusiness} /><br />
          <FlatButton
            label={this.props.intl.formatMessage(messages.register)}
            primary
            style={registerStyle}
            containerElement={<Link to="/register" />}
          />
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginPage));

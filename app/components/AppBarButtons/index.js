/**
*
* AppBarButtons
*
*/

import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const userInfoStyle = {
  color: 'white',
  marginLeft: 5,
};

class AppBarButtons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <nav
        className="mdl-navigation mdl-layout--large-screen-only"
        style={{ marginTop: 5 }}
      >
        <FlatButton
          label={<FormattedMessage {...messages.issues} />}
          secondary
          containerElement={<Link to="/" />} // eslint-disable-line jsx-a11y/anchor-has-content
        />
        { !this.props.isAuthenticated &&
          <FlatButton
            label={<FormattedMessage {...messages.signIn} />}
            secondary
            containerElement={<Link to="/login" />}
          /> }
      </nav>
    );
  }
}

AppBarButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AppBarButtons;

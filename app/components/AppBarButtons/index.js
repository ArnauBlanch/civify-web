/**
*
* AppBarButtons
*
*/

import React from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
        <FlatButton
          label={<FormattedMessage {...messages.signIn} />}
          secondary
          containerElement={<Link to="/login" />} // eslint-disable-line jsx-a11y/anchor-has-content
        />
      </nav>
    );
  }
}

AppBarButtons.propTypes = {

};

export default AppBarButtons;

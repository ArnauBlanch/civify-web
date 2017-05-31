/**
*
* AppBarButtons
*
*/

import React, { PropTypes } from 'react';
import { FlatButton, SelectField, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import catalanIcon from '../../images/ca.png';
import spanishIcon from '../../images/es.png';
import englishIcon from '../../images/en.png';

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
        { this.props.isAuthenticated &&
          <FlatButton
            label={<FormattedMessage {...messages.rewards} />}
            secondary
            containerElement={<Link to="/rewards" />} // eslint-disable-line jsx-a11y/anchor-has-content
          />
        }
        { this.props.isAuthenticated ?
          <FlatButton
            label={<FormattedMessage {...messages.signOut} />}
            secondary
            onClick={this.props.logout}
          /> :
          <FlatButton
            label={<FormattedMessage {...messages.signIn} />}
            secondary
            containerElement={<Link to="/login" />}
          /> }

        <SelectField
          value={this.props.language}
          onChange={(e, key, value) => this.props.changeLocale(value)}
          style={{ width: 60, marginTop: -7 }}
          menuItemStyle={{ marginLeft: -5 }}
          selectedMenuItemStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.07)' }}
          underlineStyle={{ borderColor: 'rgba(255,255,255,0.7)', width: 45 }}

        >
          <MenuItem value="ca" primaryText={<img src={catalanIcon} height="22" />} />
          <MenuItem value="es" primaryText={<img src={spanishIcon} height="22" />} />
          <MenuItem value="en" primaryText={<img src={englishIcon} height="22" />} />
        </SelectField>
      </nav>
    );
  }
}

AppBarButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
};

export default AppBarButtons;

/**
*
* AppDrawer
*
*/

import React, { PropTypes } from 'react';
import { Drawer, AppBar, MenuItem, SelectField } from 'material-ui';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Logo from '../../logo.svg';
import catalanIcon from '../../images/ca.png';
import spanishIcon from '../../images/es.png';
import englishIcon from '../../images/en.png';

class AppDrawer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.toggleDrawer}
      >
        <AppBar
          title={
            <Link to="/" onClick={this.props.toggleDrawer}>
              <img src={Logo} height="75%" alt="Civify logo" />
            </Link>
          }
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
        />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MenuItem onTouchTap={this.props.toggleDrawer} >
            <FormattedMessage {...messages.issues} />
          </MenuItem>
        </Link>
        { this.props.isAuthenticated &&
          <Link to="/rewards" style={{ textDecoration: 'none' }}>
            <MenuItem onTouchTap={this.props.toggleDrawer} >
              <FormattedMessage {...messages.myRewards} />
            </MenuItem>
          </Link>
        }
        { this.props.isAuthenticated ?
          <MenuItem onTouchTap={this.props.toggleDrawer} onClick={this.props.logout} >
            <FormattedMessage {...messages.signOut} />
          </MenuItem> :
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MenuItem onTouchTap={this.props.toggleDrawer} >
              <FormattedMessage {...messages.signIn} />
            </MenuItem>
          </Link>
        }
        <SelectField
          floatingLabelText={<FormattedMessage {...messages.language} />}
          value={this.props.language}
          onChange={(e, key, value) => this.props.changeLocale(value)}
          style={{ width: 60, marginLeft: 15, marginTop: -10 }}
          menuItemStyle={{ marginLeft: -5 }}
          selectedMenuItemStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.07)' }}
          underlineStyle={{ borderColor: 'rgba(255,255,255,0.7)', width: 45 }}

        >
          <MenuItem value="ca" primaryText={<img alt="Catalan" src={catalanIcon} height="22" />} />
          <MenuItem value="es" primaryText={<img alt="Spanish" src={spanishIcon} height="22" />} />
          <MenuItem value="en" primaryText={<img alt="English" src={englishIcon} height="22" />} />
        </SelectField>
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
};

export default AppDrawer;

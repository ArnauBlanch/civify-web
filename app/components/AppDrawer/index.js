/**
*
* AppDrawer
*
*/

import React, { PropTypes } from 'react';
import { Drawer, AppBar, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Logo from '../../logo.svg';

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
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AppDrawer;

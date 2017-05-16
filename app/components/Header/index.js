/**
*
* Header
*
*/

import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import AppDrawer from '../AppDrawer';
import AppBarButtons from '../AppBarButtons';
import Logo from '../../logo.svg';
import { logoutRequest } from '../../containers/LoginPage/actions';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  logout() {
    this.props.dispatch(logoutRequest());
    this.props.dispatch(push('/'));
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ position: 'fixed' }}
          title={<Link to="/"><img src={Logo} height="75%" alt="Civify logo" /></Link>}
          iconElementRight={
            <AppBarButtons
              isAuthenticated={this.props.isAuthenticated}
              logout={this.logout}
            />}
          onLeftIconButtonTouchTap={this.toggleDrawer}
        />
        <AppDrawer
          toggleDrawer={this.toggleDrawer}
          open={this.state.open}
          isAuthenticated={this.props.isAuthenticated}
          logout={this.logout}
        />
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Header);

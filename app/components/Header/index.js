/**
*
* Header
*
*/

import React from 'react';
import { AppBar } from 'material-ui';
import { Link } from 'react-router';
import AppDrawer from '../AppDrawer';
import AppBarButtons from '../AppBarButtons';
import Logo from '../../logo.svg';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ position: 'fixed' }}
          title={<Link to="/"><img src={Logo} height="75%" alt="Civify logo" /></Link>}
          iconElementRight={<AppBarButtons />}
          onLeftIconButtonTouchTap={this.toggleDrawer}
        />
        <AppDrawer
          toggleDrawer={this.toggleDrawer}
          open={this.state.open}
        />
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;

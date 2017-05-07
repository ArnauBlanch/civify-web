import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from 'material-ui';
import AppBarButtons from './AppBarButtons';
import AppDrawer from './AppDrawer';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const style = { position: 'fixed' };

    return (
      <div>
        <AppBar
          style={style}
          title={
            <Link to="/">
              <img src="logo.svg" height="75%" alt="Civify logo" />
            </Link>
          }
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

export default Header;

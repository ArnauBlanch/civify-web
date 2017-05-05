import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { white, grey500 } from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { translate } from 'react-i18next';
import Home from '../components/Home';
import Login from '../components/Login';
import AppBarButtons from '../components/AppBarButtons';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: white,
    alternateTextColor: grey500,
  },
  appBar: {
    height: 50,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { t } = this.props;
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme} >
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <AppBar
              title={<img src="logo.svg" height="75%" alt="Civify logo" />}
              iconElementRight={<AppBarButtons />}
              onLeftIconButtonTouchTap={this.toggleDrawer}
            />
            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={this.toggleDrawer}
            >
              <AppBar
                title={<img src="logo.svg" height="75%" alt="Civify logo" />}
                onLeftIconButtonTouchTap={this.toggleDrawer}
              />
              <Link to="/" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.toggleDrawer} >{t('issues')}</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.toggleDrawer} >{t('login')}</MenuItem>
              </Link>
            </Drawer>
            <main className="mdl-layout__content">
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </main>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(App);

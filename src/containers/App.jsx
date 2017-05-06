import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { white, grey500 } from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppBar } from 'material-ui';
import Home from '../components/Home';
import Login from '../components/Login';
import AppBarButtons from '../components/AppBarButtons';
import AppDrawer from '../components/AppDrawer';

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
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme} >
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <AppBar
              title={<img src="logo.svg" height="75%" alt="Civify logo" />}
              iconElementRight={<AppBarButtons />}
              onLeftIconButtonTouchTap={this.toggleDrawer}
            />
            <AppDrawer
              toggleDrawer={this.toggleDrawer}
              open={this.state.open}
            />
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

export default App;

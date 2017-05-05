import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { white, grey500 } from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './components/Header';
import Home from './components/Home';
import Advertisors from './components/Advertisors';

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

const BasicExample = () => (
  <MuiThemeProvider muiTheme={muiTheme} >
    <Router>

      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/advertisors" component={Advertisors} />
    </Router>
  </MuiThemeProvider>

);

export default BasicExample;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from '../components/Home';
import Login from '../components/Login';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Register from '../components/Register';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Nunito, sans-serif',
  palette: {
    primary1Color: '#27ae60',
    accent1Color: '#ffffff',
    alternateTextColor: '#ffffff',
  },
  appBar: {
    height: 50,
  },
});

const mainStyle = {
  fontFamily: 'Nunito, sans-serif',
  backgroundColor: '#eee',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'auto',
  maxHeight: '100vh',
  minHeight: 'min-content',
  marginTop: 50,

};

const App = (
  <Router>
    <MuiThemeProvider muiTheme={muiTheme} >
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <main className="mdl-layout__content" style={mainStyle}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
    </MuiThemeProvider>
  </Router>
);


export default App;

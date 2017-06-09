/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Header from '../../components/Header';
import mainStyle from './main.style';
import { makeSelectAuthState, makeSelectLanguage } from './selectors';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    authState: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header
          isAuthenticated={this.props.authState.isAuthenticated}
          isAdmin={this.props.authState.isAdmin}
          language={this.props.language}
        />
        <main className="mdl-layout__content" style={mainStyle}>
          {React.Children.toArray(this.props.children)}
        </main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authState: makeSelectAuthState(),
  language: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(App));

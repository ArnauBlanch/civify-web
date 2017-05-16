/*
 *
 * MapPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import makeSelectMapPage from './selectors';
import messages from './messages';

export class MapPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="MapPage"
          meta={[
            { name: 'description', content: 'Description of MapPage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MapPage: makeSelectMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

/*
 *
 * MapPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { createStructuredSelector } from 'reselect';
import makeSelectMapPage from './selectors';
// import messages from './messages';
import CustomMarker from '../../components/CustomMarker';
import { issuesRequest } from './actions';

const SimpleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
  >
    {props.markers.map((marker, index) => (
      <li key={index}> {// eslint-disable-line
      }
        <CustomMarker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          category={marker.category}
        >
        </CustomMarker>
      </li>
    ))}
  </GoogleMap>
));


class MapPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('He tornat');
    this.props.dispatch(issuesRequest());
  }

  render() {
    return (
      <div className="App">
        <SimpleMap
          containerElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw' }} />
          }
          mapElement={
            <div style={{ height: '100%', width: '100%', position: 'absolute' }} />
          }
          markers={this.props.mapState.issues}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mapState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapState: makeSelectMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

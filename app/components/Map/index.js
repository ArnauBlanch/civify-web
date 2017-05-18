/**
*
* Map
*
*/

import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import CustomMarker from '../CustomMarker';

class Map extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
      >
        {this.props.markers.map((marker) => (
          <CustomMarker
            key={marker.issue_auth_token}
            marker={marker}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            category={marker.category}
            onClick={this.props.showIssue}
          >
          </CustomMarker>
        ))}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  markers: PropTypes.array.isRequired,
  showIssue: PropTypes.func.isRequired,
};

export default withGoogleMap(Map);

/**
*
* Map
*
*/

import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import CustomMarker from '../CustomMarker';

class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      center: { lat: 41.390205, lng: 2.154007 },
    };
  }
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        center={this.state.center}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={30}
        >
          {this.props.markers.map((marker) => (
            <CustomMarker
              key={marker.issue_auth_token}
              marker={marker}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              category={marker.category}
              onClick={this.props.showIssue}
              map={this}
            >
            </CustomMarker>
          ))}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  markers: PropTypes.array.isRequired,
  showIssue: PropTypes.func.isRequired,
};

export default withGoogleMap(Map);

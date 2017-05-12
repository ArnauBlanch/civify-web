/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const SimpleMapExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
  >
    {props.markers.map((marker) => (
      <Marker
        position={marker.position}
      >
      </Marker>
    ))}
  </GoogleMap>
));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 41.390205,
          lng: 2.154007,
        },
      }],
    };
  }

  render() {
    return (
      <div className="App">
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw' }} />
          }
          mapElement={
            <div style={{ height: '100%', width: '100%', position: 'absolute' }} />
          }
          markers={this.state.markers}
        />
      </div>
    );
  }
}

export default Home;

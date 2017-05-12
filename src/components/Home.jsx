import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const SimpleMapExampleGoogleMap = withGoogleMap(() => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: [{
        position: {
          lat: 25.0122,
          long: 121.5206,
        },
      }],
    };
  }

  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: '100%' }} />
        }
        mapElement={
          <div style={{ height: '94vh' }} />
        }
      />
    );
  }
}

export default Home;

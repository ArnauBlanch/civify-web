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
// import Helmet from 'react-helmet';
import makeSelectMapPage from './selectors';
// import messages from './messages';
import CustomMarker from '../../components/CustomMarker';

const SimpleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
  >
    {props.markers.map((marker) => (
      <CustomMarker
        position={marker.position}
        category={marker.category}
      >
      </CustomMarker>
    ))}
  </GoogleMap>
));


class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 41.390205,
          lng: 2.154007,
        },
        category: 'road_signs',
      }, {
        position: {
          lat: 41.990205,
          lng: 2.854007,
        },
        category: 'suggestion',
      }, {
        position: {
          lat: 41.590205,
          lng: 2.454007,
        },
        category: 'street_furniture',
      },
      ],
    };
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
          markers={this.state.markers}
        />
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

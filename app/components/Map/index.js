/**
*
* Map
*
*/

import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import CustomMarker from '../CustomMarker';

const searchStyle = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: 240,
  height: 32,
  marginTop: 10,
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
};

class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      zoom: this.props.showingIssue ? 20 : 8,
      bounds: null,
      center: { lat: 41.390205, lng: 2.154007 },
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleZoomChanged = this.handleZoomChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showingIssue !== nextProps.showingIssue && nextProps.showingIssue) {
      this.setState({
        zoom: 20,
        center: nextProps.issueCenter,
      });
    }
  }

  handleMapMounted(map) {
    this.map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this.searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    // Set map center to first search result
    const mapCenter = places.length > 0 ? places[0].geometry.location : this.state.center;
    this.setState({
      center: mapCenter,
      zoom: 16,
    });
  }

  handleZoomChanged() {
    this.setState({ zoom: this.map.getZoom() });
  }

  render() {
    return (
      <GoogleMap
        ref={this.handleMapMounted}
        zoom={this.state.zoom}
        center={this.state.center}
        onBoundsChanged={this.handleBoundsChanged}
        onZoomChanged={this.handleZoomChanged}
      >
        <SearchBox
          ref={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT} // eslint-disable-line no-undef
          onPlacesChanged={this.handlePlacesChanged}
          inputPlaceholder={this.props.intl.formatMessage(messages.searchPlace)}
          inputStyle={searchStyle}
        />
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
              onClick={this.props.onIssueClick}
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
  onIssueClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  showingIssue: PropTypes.bool.isRequired,
};

export default withGoogleMap(injectIntl(Map));

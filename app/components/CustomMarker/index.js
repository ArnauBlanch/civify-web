/**
*
* Header
*
*/

import React from 'react';

import { Marker } from 'react-google-maps';

import roadSigns from '!file-loader?name=[name].[ext]!../../images/marker_icons/traffic_signs_lights_pin.png';
import illumination from '!file-loader?name=[name].[ext]!../../images/marker_icons/street_lights_pin.png';
import grove from '!file-loader?name=[name].[ext]!../../images/marker_icons/trees_and_plants_pin.png';
import streetFurniture from '!file-loader?name=[name].[ext]!../../images/marker_icons/urban_furniture_pin.png';
import trashAndCleaning from '!file-loader?name=[name].[ext]!../../images/marker_icons/trash_and_cleaning_pin.png';
import publicTransport from '!file-loader?name=[name].[ext]!../../images/marker_icons/public_transportation_pin.png';
import suggestion from '!file-loader?name=[name].[ext]!../../images/marker_icons/suggestion_pin.png';
import other from '!file-loader?name=[name].[ext]!../../images/marker_icons/others_pin.png';


class CustomMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      position: props.position,
      iconUrl: this.getIcon(props),
    };
  }
  getIcon(props) {
    switch (props.category) {
      case 'road_signs':
        return roadSigns;
      case 'illumination':
        return illumination;
      case 'grove':
        return grove;
      case 'street_furniture':
        return streetFurniture;
      case 'trash_and_cleaning':
        return trashAndCleaning;
      case 'public_transport':
        return publicTransport;
      case 'suggestion':
        return suggestion;
      case 'other':
        return other;
      default:
        return 'error';
    }
  }

  render() {
    return (
      <Marker
        icon={{ url: this.getIcon(this.props), scaledSize: new google.maps.Size(37.8, 48.51) }} // eslint-disable-line no-undef
        position={this.props.position}
        onClick={this.props.onClick}
      >
      </Marker>
    );
  }
}

CustomMarker.propTypes = {
  position: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default CustomMarker;

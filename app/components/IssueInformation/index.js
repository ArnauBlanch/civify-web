/**
*
* IssueInformation
*
*/

import { FormattedRelative } from 'react-intl';
import React, { PropTypes } from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import BASE_URL from '../../api';

import roadSigns from '!file-loader?name=[name].[ext]!../../images/category_icons/traffic_signs_lights_icon.png';
import illumination from '!file-loader?name=[name].[ext]!../../images/category_icons/street_lights_icon.png';
import grove from '!file-loader?name=[name].[ext]!../../images/category_icons/trees_and_plants_icon.png';
import streetFurniture from '!file-loader?name=[name].[ext]!../../images/category_icons/urban_furniture_icon.png';
import trashAndCleaning from '!file-loader?name=[name].[ext]!../../images/category_icons/trash_and_cleaning_icon.png';
import publicTransport from '!file-loader?name=[name].[ext]!../../images/category_icons/public_transportation_icon.png';
import suggestion from '!file-loader?name=[name].[ext]!../../images/category_icons/suggestion_icon.png';
import other from '!file-loader?name=[name].[ext]!../../images/category_icons/others_icon.png';

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const confirmStyle = {
  float: 'right',
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'green',
};

const textRowStyle = {
  marginTop: '10px',
  marginBottom: '10px',
  fontSize: '15px',
};

const descriptionRowStyle = {
  marginTop: '20px',
  marginBottom: '20px',
  fontSize: '15px',
};

const geocoder = new google.maps.Geocoder(); // eslint-disable-line no-undef


class IssueInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      address: 'Loading',
    };
  }
  renderCategory() {
    const { issue } = this.props;
    if (!issue.isEmpty) {
      let categoryString;
      let imageUrl = streetFurniture;
      switch (issue.category) {
        case 'road_signs':
          categoryString = 'Road Signs';
          imageUrl = roadSigns;
          break;
        case 'illumination':
          categoryString = 'Illumination';
          imageUrl = illumination;
          break;
        case 'grove':
          categoryString = 'Grove';
          imageUrl = grove;
          break;
        case 'street_furniture':
          categoryString = 'Street furniture';
          imageUrl = streetFurniture;
          break;
        case 'trash_and_cleaning':
          categoryString = 'Trash and cleaning';
          imageUrl = trashAndCleaning;
          break;
        case 'public_transport':
          categoryString = 'Public transport';
          imageUrl = publicTransport;
          break;
        case 'suggestion':
          categoryString = 'Suggestion';
          imageUrl = suggestion;
          break;
        case 'other':
          categoryString = 'Other';
          imageUrl = other;
          break;
        default:
          categoryString = '####';
          break;
      }
      return (
        <span>
          <img style={{ width: '30px' }} src={imageUrl} alt="category" />
          <span style={{ paddingLeft: '10px' }}>{categoryString}</span>
        </span>
      );
    }
    return null;
  }
  renderTime() {
    const { issue } = this.props;
    if (!issue.isEmpty) {
      return (<FormattedRelative value={new Date(issue.created_at)} />);
    }
    return null;
  }
  render() {
    const { issue } = this.props;
    if (!issue.isEmpty) {
      const latlng = {
        lat: issue.latitude,
        lng: issue.longitude,
      };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[1]) {
            this.setState({ address: results[1].formatted_address });
          } else {
            console.log('No results found');
          }
        }
      });
    }
    return (
      <Card>
        <CardMedia
          style={{
            width: '400px',
            height: '250px',
            overflow: 'hidden',
          }}
        >
          <img //eslint-disable-line
            src={!issue.isEmpty ? (BASE_URL + issue.picture.small_url) : 'whatever'}
            // src="http://staging-api.civify.cf/system/issues/pictures/000/000/161/med/data?1495009364"
            style={{ height: '250px', objectFit: 'cover' }}
          />
        </CardMedia>
        <CardText>
          <div style={textRowStyle}>
            <p style={{ textAlign: 'left', lineHeight: '36px' }}>
              <span style={titleStyle}> {!issue.isEmpty ? issue.title : 'Error loading'} </span>
              <span style={confirmStyle}>+{!issue.isEmpty ? issue.confirm_votes : '(-1)'}</span>
            </p>
          </div>
          <div style={textRowStyle}>
            <b>Category</b>
            <span>
            </span>
            <span style={{ paddingLeft: '10px' }}>
              {this.renderCategory()}
            </span>
          </div>
          <div style={descriptionRowStyle}>
            <b>Does it pose a risk?</b> <span style={{ color: 'red', paddingLeft: '10px' }}> {
              !issue.Empty ? (issue.risk ? 'Si' : 'No') : '##' // eslint-disable-line
          } </span>
          </div>
          <div style={descriptionRowStyle}>
            <span style={{ color: 'grey' }}>
              {!issue.isEmpty ? issue.description : '###################'}
            </span>
          </div>
          <div style={textRowStyle}>
            <span><i>{!issue.isEmpty ? this.state.address : '#######'}</i></span>
          </div>
          <div style={textRowStyle}>
            <span style={{ color: 'grey' }}><i>
              {this.renderTime()}
            </i></span>
          </div>
        </CardText>
      </Card>
    );
  }
}

IssueInformation.propTypes = {
  issue: PropTypes.object,
};

export default IssueInformation;

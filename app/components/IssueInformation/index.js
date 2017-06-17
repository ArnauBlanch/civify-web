/**
*
* IssueInformation
*
*/

import roadSigns from '!file-loader?name=[name].[ext]!../../images/category_icons/traffic_signs_lights_icon.png';
import illumination from '!file-loader?name=[name].[ext]!../../images/category_icons/street_lights_icon.png';
import grove from '!file-loader?name=[name].[ext]!../../images/category_icons/trees_and_plants_icon.png';
import streetFurniture from '!file-loader?name=[name].[ext]!../../images/category_icons/urban_furniture_icon.png';
import trashAndCleaning from '!file-loader?name=[name].[ext]!../../images/category_icons/trash_and_cleaning_icon.png';
import publicTransport from '!file-loader?name=[name].[ext]!../../images/category_icons/public_transportation_icon.png';
import suggestion from '!file-loader?name=[name].[ext]!../../images/category_icons/suggestion_icon.png';
import other from '!file-loader?name=[name].[ext]!../../images/category_icons/others_icon.png';

import { FormattedMessage, FormattedRelative } from 'react-intl';
import React, { PropTypes } from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import BASE_URL from '../../api';
import messages from './messages';

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
      address: <FormattedMessage {...messages.loading} />,
    };
  }
  renderCategory() {
    const { issue } = this.props;
    if (!issue.isEmpty) {
      let categoryString;
      let imageUrl = streetFurniture;
      switch (issue.category) {
        case 'road_signs':
          categoryString = messages.roadSigns;
          imageUrl = roadSigns;
          break;
        case 'illumination':
          categoryString = messages.illumination;
          imageUrl = illumination;
          break;
        case 'grove':
          categoryString = messages.grove;
          imageUrl = grove;
          break;
        case 'street_furniture':
          categoryString = messages.streetFurniture;
          imageUrl = streetFurniture;
          break;
        case 'trash_and_cleaning':
          categoryString = messages.trashAndCleaning;
          imageUrl = trashAndCleaning;
          break;
        case 'public_transport':
          categoryString = messages.publicTransportation;
          imageUrl = publicTransport;
          break;
        case 'suggestion':
          categoryString = messages.suggestion;
          imageUrl = suggestion;
          break;
        default:
          categoryString = messages.others;
          imageUrl = other;
          break;
      }
      return (
        <span>
          <img style={{ width: 18 }} src={imageUrl} alt="category" />
          <span style={{ paddingLeft: '10px' }}><FormattedMessage {...categoryString} /></span>
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
          if (results[0]) {
            this.setState({ address: results[0].formatted_address });
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
            style={{ height: '250px', objectFit: 'cover' }}
          />
        </CardMedia>
        <CardText>
          <div style={textRowStyle}>
            <p style={{ textAlign: 'left', lineHeight: '36px' }}>
              <span style={titleStyle}> {!issue.isEmpty ? issue.title : <FormattedMessage {...messages.errorLoading} />} </span>
              <span style={confirmStyle}>+{!issue.isEmpty ? issue.confirm_votes : '(-1)'}</span>
            </p>
          </div>
          <div style={textRowStyle}>
            <span style={{ color: !issue.resolved ? 'red' : 'green' }}>
              <b>{ issue.resolved ?
                <FormattedMessage {...messages.resolved} />
                : <FormattedMessage {...messages.unresolved} /> }</b>
            </span>
          </div>
          <div style={textRowStyle}>
            <b><FormattedMessage {...messages.category} /></b>
            <span>
            </span>
            <span style={{ paddingLeft: '10px' }}>
              {this.renderCategory()}
            </span>
          </div>
          <div style={descriptionRowStyle}>
            <b><FormattedMessage {...messages.doesItPoseARisk} /></b> <span style={{ color: issue.risk ? 'red' : 'green', paddingLeft: '10px' }}> {
              !issue.Empty ? (issue.risk ? <FormattedMessage {...messages.yes} /> : <FormattedMessage {...messages.no} />) : '-' // eslint-disable-line
            } </span>
          </div>
          <div style={descriptionRowStyle}>
            <span style={{ color: 'grey' }}>
              {!issue.isEmpty ? issue.description : '-'}
            </span>
          </div>
          <div style={textRowStyle}>
            <span><i>{!issue.isEmpty ? this.state.address : '-'}</i></span>
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

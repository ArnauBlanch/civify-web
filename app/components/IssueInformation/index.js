/**
*
* IssueInformation
*
*/

import { FormattedRelative } from 'react-intl';
import React, { PropTypes } from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import BASE_URL from '../../api';

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
            style={{ height: '250', objectFit: 'cover' }}
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
            <b>Categoria</b>
            <span>
              <img //eslint-disable-line
                src=""
              />
            </span>
            <span style={{ paddingLeft: '10px' }}>Mobiliari</span>
          </div>
          <div style={descriptionRowStyle}>
            <b>Suposa un risc?</b> <span style={{ color: 'red', paddingLeft: '10px' }}> {
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
              <FormattedRelative value={new Date(issue.created_at)} /></i>
            </span>
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

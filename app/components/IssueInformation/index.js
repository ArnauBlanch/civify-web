/**
*
* IssueInformation
*
*/
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


class IssueInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { issue } = this.props;
    return (
      <Card>
        <CardMedia
          style={{
            width: '400px',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <img //eslint-disable-line
            src={!issue.isEmpty ? (BASE_URL + issue.picture.small_url) : 'whatever'}
            // src="http://staging-api.civify.cf/system/issues/pictures/000/000/161/med/data?1495009364"
            style={{ maxWidth: '100%', marginTop: '-45px' }}
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
            <b>Categoria</b> Mobiliari
          </div>
          <div style={descriptionRowStyle}>
            <b>Suposa un risc?</b> <span style={{ color: 'red' }}> {
              !issue.Empty ? (issue.risk ? 'Si' : 'No') : '##' // eslint-disable-line
          } </span>
          </div>
          <div style={descriptionRowStyle}>
            <span style={{ color: 'grey' }}>
              {!issue.isEmpty ? issue.description : '###################'}
            </span>
          </div>
          <div style={textRowStyle}>
            <span><i>Carrer de la diputació, 13, Barcelona</i></span>
          </div>
          <div style={textRowStyle}>
            <span style={{ color: 'grey' }}><i>fa 3 setmanes</i></span>
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

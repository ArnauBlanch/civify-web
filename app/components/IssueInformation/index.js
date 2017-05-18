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
    console.log('IssueInformation!!');
    console.log(this.props.issue);
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
            src={issue ? (BASE_URL + issue.picture.med_url) : 'whatever'}
            // src="http://staging-api.civify.cf/system/issues/pictures/000/000/161/med/data?1495009364"
            style={{ maxWidth: '100%', marginTop: '-45px' }}
          />
        </CardMedia>
        <CardText>
          <div style={textRowStyle}>
            <p style={{ textAlign: 'left', lineHeight: '36px' }}>
              <span style={titleStyle}> {issue ? issue.title : 'Error loading'} </span>
              <span style={confirmStyle}>+{issue ? issue.confirm_votes : '(-1)'}</span>
            </p>
          </div>
          <div style={textRowStyle}>
            <b>Categoria</b> Mobiliari
          </div>
          <div style={descriptionRowStyle}>
            <b>Suposa un risc?</b> <span style={{ color: 'red' }}>No </span>
          </div>
          <div style={descriptionRowStyle}>
            <span style={{ color: 'grey' }}>
              Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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

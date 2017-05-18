/**
*
* IssueInformation
*
*/
import elephant from '!file-loader?name=[name].[ext]!../../images/elephant.jpg';
import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import messages from './messages';

class IssueInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card>
        <CardMedia>
          <img
            src="http://staging-api.civify.cf/system/issues/pictures/000/000/012/original/data?1492950502"
            style={{ width: '50%' }}
          />
        </CardMedia>
        <CardTitle title="Card title" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

IssueInformation.propTypes = {

};

export default IssueInformation;

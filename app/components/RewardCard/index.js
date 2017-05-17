/**
*
* RewardCard
*
*/

import React from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class RewardCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <Card>
          <CardMedia>
            <img alt="Reward" src="http://img2.thejournal.ie/article/3275421/river?version=3275440&width=1340" />
          </CardMedia>
          <CardTitle title="10% descompte en sessions golfa" subtitle="creada fa 20 dies" />
        </Card>
      </div>
    );
  }
}

RewardCard.propTypes = {

};

export default RewardCard;

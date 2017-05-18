/**
*
* RewardCard
*
*/

import React, { PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui';
import API_URL from '../../api';
import coinsIcon from '../../images/coins.svg';

class RewardCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <Card
          onClick={() => console.log(this.props.reward.award_auth_token)}
          style={{ width: '100%', height: '95%' }}
        >
          <CardMedia
            style={{
              overflow: 'hidden',
              background: 'red',
              maxHeight: '200',
            }}
          >
            <img
              alt="Reward"
              src={`${API_URL}/${this.props.reward.picture.med_url}`}
            />
          </CardMedia>
          <CardTitle
            title={this.props.reward.title}
            subtitle={<span>
              <img alt="Coins" src={coinsIcon} height={20} />&nbsp;&nbsp;{this.props.reward.price}
            </span>}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 20,
              lineHeight: 1.3,
              marginBottom: 10,
              maxHeight: 50,
              overflow: 'hidden',
            }}
            subtitleStyle={{ fontSize: 20 }}
          />
        </Card>
      </div>
    );
  }
}

RewardCard.propTypes = {
  reward: PropTypes.object.isRequired,
};

export default RewardCard;

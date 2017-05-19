/**
*
* RewardCard
*
*/

import React, { PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui';
import { Link } from 'react-router';
import API_URL from '../../api';
import coinsIcon from '../../images/coins.svg';

class RewardCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { reward } = this.props;
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <Link to={`/rewards/${reward.award_auth_token}`} style={{ textDecoration: 'none' }}>
          <Card>
            <CardMedia>

              <img
                alt="Reward"
                src={`${API_URL}${reward.picture.med_url}`}
                style={{ height: '200', objectFit: 'cover' }}
              />

            </CardMedia>
            <CardTitle
              title={reward.title}
              subtitle={<span>
                <img alt="Coins" src={coinsIcon} height={20} />&nbsp;&nbsp;{reward.price}
              </span>}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 20,
                lineHeight: 1.3,
                marginBottom: 10,
                height: 50,
                overflow: 'hidden',
              }}
              subtitleStyle={{ fontSize: 20 }}
            />
          </Card>
        </Link>
      </div>
    );
  }
}

RewardCard.propTypes = {
  reward: PropTypes.object.isRequired,
};

export default RewardCard;

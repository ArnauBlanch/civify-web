/**
*
* AchievementsTable
*
*/

import React, { PropTypes } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow,
TableBody } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AchievementRow from '../AchievementRow';

export const numStyle = {
  width: 50,
  paddingLeft: 5,
  paddingRight: 5,
  textAlign: 'center',
};

export const titleWidth = 150;
export const goalWidth = 130;

class AchievementsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { achievements } = this.props;
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
        >
          <TableHeaderColumn style={{ width: titleWidth }}><FormattedMessage {...messages.title} /></TableHeaderColumn>
          <TableHeaderColumn style={{ width: goalWidth }}><FormattedMessage {...messages.goal} /></TableHeaderColumn>
          <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.xp} /></TableHeaderColumn>
          <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.coins} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.description} /></TableHeaderColumn>
        </TableHeader>
        <TableBody>
          {achievements.map((a) => <AchievementRow key={a.achievement_auth_token} achievement={a} />)}
        </TableBody>
      </Table>
    );
  }
}

AchievementsTable.propTypes = {
  achievements: PropTypes.array.isRequired,
};

export default AchievementsTable;

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
import AchievementRow, { numStyle, goalWidth, enabledStyle } from '../AchievementRow';

class AchievementsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { achievements, handleToggle } = this.props;
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow style={{ textAlign: 'left' }}>
            <TableHeaderColumn><FormattedMessage {...messages.title} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone" style={{ width: goalWidth }}><FormattedMessage {...messages.goal} /></TableHeaderColumn>
            <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.xp} /></TableHeaderColumn>
            <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.coins} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet"><FormattedMessage {...messages.description} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.badge} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.edit} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={enabledStyle}><FormattedMessage {...messages.enableDisable} /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements.map((a) => (
            <AchievementRow
              key={a.achievement_token}
              achievement={a}
              handleToggle={(enabled) => handleToggle(a.achievement_token, enabled)}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

AchievementsTable.propTypes = {
  achievements: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default AchievementsTable;

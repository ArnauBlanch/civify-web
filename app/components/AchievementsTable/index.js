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
import AchievementRow, { numStyle, goalWidth } from '../AchievementRow';

class AchievementsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { badgeOpen: 'none' };
    this.requestOpen = this.requestOpen.bind(this);
    this.requestClose = this.requestClose.bind(this);
  }

  requestOpen(id) {
    if (this.state.badgeOpen === 'none') {
      this.setState({ badgeOpen: id });
    }
  }
  requestClose(id) {
    if (this.state.badgeOpen === id) {
      this.setState({ badgeOpen: 'none' });
    }
  }

  render() {
    const { achievements } = this.props;
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
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.delete} /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements.map((a) => (
            <AchievementRow
              key={a.achievement_token}
              achievement={a}
              open={this.state.badgeOpen === a.achievement_token}
              requestOpen={() => this.requestOpen(a.achievement_token)}
              requestClose={() => this.requestClose(a.achievement_token)}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

AchievementsTable.propTypes = {
  achievements: PropTypes.array.isRequired,
};

export default AchievementsTable;

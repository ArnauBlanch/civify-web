/**
*
* AchievementRow
*
*/

import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { numStyle, titleWidth, goalWidth } from '../AchievementsTable';

const goals = {
  issue: messages.createIssues,
  confirm: messages.confirmIssues,
  resolve: messages.resolveIssues,
};

const Goal = (a) => (
  <FormattedMessage {...goals[a.kind]} values={{ num: a.number }} />
);

const Tooltip = (id, content) => (
  <div
    className="mdl-tooltip"
    data-mdl-for={id}
    style={{ marginTop: -25, fontSize: 13 }}
  >
    {content}
  </div>
);

class AchievementRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const a = this.props.achievement;
    return (
      <TableRow>
        <TableRowColumn id={`title${a.achievement_token}`} style={{ width: titleWidth }}>
          {a.title}{Tooltip(`title${a.achievement_token}`, a.title)}</TableRowColumn>
        <TableRowColumn id={`goal${a.achievement_token}`} style={{ width: goalWidth }}>
          {Goal(a)}
          {Tooltip(`goal${a.achievement_token}`, Goal(a))}
        </TableRowColumn>
        <TableRowColumn style={numStyle}>{a.xp}</TableRowColumn>
        <TableRowColumn style={numStyle}>{a.coins}</TableRowColumn>
        <TableRowColumn id={`desc${a.achievement_token}`}>
          {a.description}{Tooltip(`desc${a.achievement_token}`, a.description)}</TableRowColumn>
      </TableRow>
    );
  }
}

AchievementRow.propTypes = {
  achievement: PropTypes.object.isRequired,
};

export default AchievementRow;

/**
*
* AchievementRow
*
*/

import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import { TableRow, TableRowColumn, Toggle } from 'material-ui';
import { injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router';
import messages from './messages';
import BASE_URL from '../../api';

export const numStyle = {
  width: 50,
  paddingLeft: 5,
  paddingRight: 5,
  textAlign: 'center',
};
export const enabledStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  textAlign: 'center',
  width: 60,
};
export const goalWidth = 170;

const goals = {
  issue: messages.createIssues,
  confirm: messages.confirmIssues,
  resolve: messages.resolveIssues,
  reward: messages.getRewards,
  use: messages.useRewards,
  confirmed_received: messages.receiveConfirmations,
  resolve_received: messages.receiveResolutions,
  coins_spent: messages.spendCoins,
  issues_resolved: messages.issuesResolved,
  level: messages.reachLevel,
};

const tGoal = (t, a) => (
  t(goals[a.kind], { num: a.number })
);

const badgeTooltip = (badge) => (
  ReactDOMServer.renderToStaticMarkup(
    <div style={{ textAlign: 'center' }}>
      <h6 style={{ marginTop: 10 }}>{badge.title}</h6>
      <img src={`${BASE_URL}/${badge.large_url}`} alt={badge.title} height={100} />
    </div>
));

class AchievementRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const t = this.props.intl.formatMessage;
    const a = this.props.achievement;
    const { handleToggle } = this.props;
    return (
      <TableRow>
        <TableRowColumn>
          <a data-tip={a.title} style={{ color: '#000' }}>{a.title}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone" style={{ width: goalWidth }}>
          <a data-tip={tGoal(t, a)} data-html style={{ color: '#000' }}>{tGoal(t, a)}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn style={numStyle}>{a.xp}</TableRowColumn>
        <TableRowColumn style={numStyle}>{a.coins}</TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet">
          <a data-tip={a.description} style={{ color: '#000' }}>{a.description}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}>
          <i // eslint-disable-line
            className="material-icons"
            style={{ fontSize: 18, color: '#27ae60' }}
            data-tip={badgeTooltip(a.badge)}
            data-html
          >stars</i><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}>
          <Link
            to={`/achievements/${a.achievement_token}/edit`}
            className="material-icons"
            style={{ fontSize: 18, color: '#27ae60', textDecoration: 'none' }}
          >mode_edit</Link>
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone" style={enabledStyle}>
          <Toggle
            toggled={a.enabled}
            style={{ width: 10 }}
            onToggle={(e, checked) => {
              if (a.enabled !== checked) {
                handleToggle(checked);
              }
            }}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

AchievementRow.propTypes = {
  intl: intlShape.isRequired,
  achievement: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default injectIntl(AchievementRow);

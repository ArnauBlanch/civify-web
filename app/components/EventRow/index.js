/**
*
* EventRow
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

const colStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  textAlign: 'center',
};

export const numStyle = {
  width: 45,
  ...colStyle,
};
export const enabledStyle = {
  width: 60,
  ...colStyle,
};
export const dateStyle = {
  width: 70,
  ...colStyle,
};
export const goalStyle = {
  width: 140,
  ...colStyle,
  textAlign: 'left',
};

const goals = {
  issue: messages.createIssues,
  confirm: messages.confirmIssues,
  resolve: messages.resolveIssues,
};

const tGoal = (t, a) => (
  t(goals[a.kind], { num: a.number })
);

const badgeTooltip = (badge) => (
  ReactDOMServer.renderToStaticMarkup(
    <div style={{ textAlign: 'center' }}>
      <h6 style={{ marginTop: 10 }}>{badge.title}</h6>
      <img src={`${BASE_URL}/${badge.large_url}`} alt={badge.title} height={120} />
    </div>
));

class EventRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const t = this.props.intl.formatMessage;
    const { formatDate, formatTime } = this.props.intl;
    const e = this.props.event;
    return (
      <TableRow>
        <TableRowColumn>
          <a data-tip={e.title} style={{ color: '#000' }}>{e.title}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone" style={goalStyle}>
          <a data-tip={tGoal(t, e)} data-html style={{ color: '#000' }}>{tGoal(t, e)}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn style={numStyle}>{e.xp}</TableRowColumn>
        <TableRowColumn style={numStyle}>{e.coins}</TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateStyle}>
          <a
            data-tip={`${formatDate(e.start_date, { day: 'numeric', month: 'long', year: 'numeric' })}
            <br />
            ${formatTime(e.start_date, { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`}
            data-html
            style={{ color: '#000' }}
          >
            {formatDate(e.start_date, { year: '2-digit', month: '2-digit', day: '2-digit' })}
          </a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateStyle}>
          <a
            data-tip={`${formatDate(e.end_date, { day: 'numeric', month: 'long', year: 'numeric' })}
            <br />
            ${formatTime(e.end_date, { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`}
            data-html
            style={{ color: '#000' }}
          >
            {formatDate(e.end_date, { year: '2-digit', month: '2-digit', day: '2-digit' })}
          </a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet">
          <a data-tip={e.description} style={{ color: '#000' }}>{e.description}</a><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}>
          <i // eslint-disable-line
            className="material-icons"
            style={{ fontSize: 18, color: '#27ae60' }}
            data-tip={ReactDOMServer.renderToStaticMarkup(<img src={`${BASE_URL}/${e.picture.large_url}`} alt={e.title} height={180} />)}
            data-html
          >insert_photo</i><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}>
          <i // eslint-disable-line
            className="material-icons"
            style={{ fontSize: 18, color: '#27ae60' }}
            data-tip={badgeTooltip(e.badge)}
            data-html
          >stars</i><ReactTooltip />
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}>
          <Link
            to={`/events/${e.event_token}/edit`}
            className="material-icons"
            style={{ fontSize: 18, color: '#27ae60', textDecoration: 'none' }}
          >mode_edit</Link>
        </TableRowColumn>
        <TableRowColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={enabledStyle}>
          <Toggle toggled={e.enabled} style={{ width: 10 }} />
        </TableRowColumn>
      </TableRow>
    );
  }
}

EventRow.propTypes = {
  intl: intlShape.isRequired,
  event: PropTypes.object.isRequired,
};

export default injectIntl(EventRow);

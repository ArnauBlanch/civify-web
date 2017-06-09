/**
*
* EventsTable
*
*/

import React, { PropTypes } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow,
TableBody } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import EventRow, { numStyle, goalStyle, enabledStyle, dateStyle } from '../EventRow';

class EventsTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { events, handleToggle } = this.props;
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow style={{ textAlign: 'left' }}>
            <TableHeaderColumn><FormattedMessage {...messages.title} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone" style={goalStyle}><FormattedMessage {...messages.goal} /></TableHeaderColumn>
            <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.xp} /></TableHeaderColumn>
            <TableHeaderColumn style={numStyle}><FormattedMessage {...messages.coins} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateStyle}><FormattedMessage {...messages.startDate} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateStyle}><FormattedMessage {...messages.endDate} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet"><FormattedMessage {...messages.description} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.image} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.badge} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={numStyle}><FormattedMessage {...messages.edit} /></TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet" style={enabledStyle}><FormattedMessage {...messages.enabled} /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => (
            <EventRow
              key={e.event_token}
              event={e}
              handleToggle={(enabled) => handleToggle(e.event_token, enabled)}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

EventsTable.propTypes = {
  events: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default EventsTable;

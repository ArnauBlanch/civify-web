/*
 *
 * EventsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Paper, CircularProgress, FloatingActionButton, FlatButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { push } from 'react-router-redux';
import makeSelectEventsPage from './selectors';
import messages from './messages';
import EventsTable from '../../components/EventsTable';
import { getEventsRequest } from './actions';
import { editEventRequest } from '../EditEvent/actions';

const FABstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export class EventsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { enabled: undefined };
    this.filterChanged = this.filterChanged.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getEventsRequest(this.state.enabled));
  }

  filterChanged(enabled) {
    if (enabled !== this.state.enabled) {
      this.setState({ enabled });
    }
  }

  toggleEvent(id, enabled) {
    this.props.dispatch(editEventRequest(id, { enabled }, false));
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { enabled } = this.state;
    const { currentlySending, error } = this.props.EventsPage;
    const originalEvents = this.props.EventsPage.events;
    let events;
    if (typeof enabled !== 'undefined') {
      events = originalEvents.filter((e) => e.enabled === enabled);
    } else {
      events = originalEvents;
    }
    return (
      <div>
        <Helmet
          title={`Civify | ${t(messages.events)}`}
          meta={[
            { name: 'description', content: 'Rewards of a business' },
          ]}
        />
        { currentlySending ? <CircularProgress size={60} style={{ marginTop: 100 }} /> :
          typeof events !== 'undefined' &&
          <Paper
            style={{
              textAlign: 'center',
              width: '100%',
              padding: 30,
              marginTop: 20,
              marginBottom: 20,
              maxWidth: 1000,
            }}
            zDepth={4}
          >
            <h3><FormattedMessage {...messages.events} /></h3>
            { (!error && (typeof events !== 'undefined')) &&
              <div style={{ width: '100%', textAlign: 'left' }}>
                <b>Filter:&nbsp;&nbsp;</b>
                <FlatButton
                  label={<FormattedMessage {...messages.all} />}
                  primary
                  disabled={typeof enabled === 'undefined'}
                  onTouchTap={() => this.filterChanged(undefined)}
                />
                <FlatButton
                  label={<FormattedMessage {...messages.enabled} />}
                  primary
                  disabled={typeof enabled !== 'undefined' && enabled}
                  onTouchTap={() => this.filterChanged(true)}
                />
                <FlatButton
                  label={<FormattedMessage {...messages.disabled} />}
                  primary
                  disabled={typeof enabled !== 'undefined' && !enabled}
                  onTouchTap={() => this.filterChanged(false)}
                />
              </div>
            }

            { error && <h5 style={{ color: 'red', margin: 50 }}><FormattedMessage {...messages.error} /></h5> }
            <EventsTable
              events={events}
              handleToggle={this.toggleEvent}
            />
            { !error && events.length === 0 &&
              <h5 style={{ color: '#888', margin: 50 }}><FormattedMessage {...messages.thereAreNoEvents} /></h5> }
          </Paper>
        }
        <FloatingActionButton
          style={FABstyle}
          onClick={() => this.props.dispatch(push('/events/new'))}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

EventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  EventsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EventsPage: makeSelectEventsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EventsPage));

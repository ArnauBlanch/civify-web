/*
 *
 * StatsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, Toggle, RaisedButton } from 'material-ui';
import Helmet from 'react-helmet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ActionRefresh from 'material-ui/svg-icons/action/autorenew';
import { Chart } from 'react-google-charts';

import Map from '../../components/Map';
import makeSelectStatsPage from './selectors';
import { issuesRequest } from '../MapPage/actions';
import messages from './messages';
import prepareStats from './prepareStats';

const geocoder = new google.maps.Geocoder(); // eslint-disable-line no-undef

export class StatsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      bounds: undefined,
      firstLoaded: false,
      fullMap: true,
      mapIssues: [],
      address: '',
      firstChart: true,
    };
    this.updateIssues = this.updateIssues.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapIssues.length === 0 && nextProps.MapPage.issues.length > 0) {
      this.setState({ mapIssues: nextProps.MapPage.issues });
    }
  }

  updateIssues() {
    if (this.state.bounds) {
      this.props.dispatch(issuesRequest({ ...this.state.bounds }));
      geocoder.geocode({
        bounds: new google.maps.LatLngBounds(                     // eslint-disable-line no-undef
          new google.maps.LatLng(this.state.bounds.lat_min, this.state.bounds.lng_min), // eslint-disable-line no-undef
          new google.maps.LatLng(this.state.bounds.lat_max, this.state.bounds.lng_max), // eslint-disable-line no-undef
        ),
      }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.setState({ address: results[0].formatted_address });
          }
        }
      });
    }
  }

  handleBoundsChanged(newBounds) {
    const bounds = {
      lat_min: newBounds.f.b,
      lat_max: newBounds.f.f,
      lng_min: newBounds.b.b,
      lng_max: newBounds.b.f,
    };
    this.setState({ bounds });
    if (!this.state.firstLoaded) {
      this.updateIssues();
      this.setState({ firstLoaded: true });
    }
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { issues } = this.props.MapPage;
    const { mapIssues, fullMap, address } = this.state;
    prepareStats(t, issues);
    return (
      <div style={{ width: '100%', maxWidth: 1000, maxHeight: 1000 }}>
        <Helmet
          title={`Civify | ${t(messages.stats)}`}
          meta={[
            { name: 'description', content: 'Statistics about the issues in a place' },
          ]}
        />
        <Paper
          style={{
            textAlign: 'center',
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 20,
            marginBottom: 20,
          }}
          zDepth={4}
        >
          <h3 style={{ margin: 0 }}><FormattedMessage {...messages.stats} /></h3>
          <h5 style={{ margin: 10 }}><i>{address}</i></h5>
          <div className="mdl-grid">
            <Toggle
              className="mdl-cell mdl-cell--2-col"
              label={<FormattedMessage {...messages.showCharts} />}
              style={{ width: 200, right: 0 }}
              toggled={!this.state.fullMap}
              onToggle={() => this.setState({ fullMap: !fullMap })}
            />
            { !fullMap &&
              <RaisedButton
                className="mdl-cell mdl-cell--2-col"
                label={<FormattedMessage {...messages.refreshStats} />}
                labelPosition="before"
                primary
                icon={<ActionRefresh />}
                style={{ marginTop: 0 }}
                onTouchTap={this.updateIssues}
              /> }
          </div>
          <div className="mdl-grid" style={{ maxWidth: 940 }}>
            <div
              className={`mdl-cell ${!fullMap && 'mdl-cell--9-col'}`}
              style={fullMap ? { width: '100%' } : {}}
            >
              <Map
                containerElement={
                  <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative' }} />
                }
                mapElement={
                  <div style={{ height: '100%', width: '100%', position: 'relative' }} />
                }
                markers={mapIssues}
                heatmapEnabled
                onBoundsChanged={this.handleBoundsChanged}
                onInitMap={this.updateIssues}
                fullMap={fullMap}
              />
            </div>
            <div
              className={`mdl-cell ${!fullMap && 'mdl-cell--3-col'}`}
              style={fullMap ? { display: 'none' } : {}}
            >
              Select chart / options
              <Toggle
                className="mdl-cell mdl-cell--2-col"
                label={<FormattedMessage {...messages.showResolvedComparison} />}
                style={{ width: 200, right: 0 }}
                toggled={this.state.firstChart}
                onToggle={() => this.setState({ firstChart: !this.state.firstChart })}
              >
              </Toggle>
            </div>

          </div>
          { !fullMap &&
            <div>
              <h4><b><FormattedMessage {...messages.issuesByCategory} /> (%)</b></h4>
              <Chart
                chartType="PieChart"
                data={prepareStats(t, issues)}
                width="100%"
                height="450px"
                legend_toggle
              />
            </div> }
        </Paper>
      </div>
    );
  }
}

StatsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  MapPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MapPage: makeSelectStatsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StatsPage));

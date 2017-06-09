/*
 *
 * StatsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, RaisedButton, SelectField, MenuItem } from 'material-ui';
import Helmet from 'react-helmet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ActionRefresh from 'material-ui/svg-icons/action/autorenew';
import { Chart } from 'react-google-charts';

import Map from '../../components/Map';
import makeSelectStatsPage from './selectors';
import { issuesRequest } from '../MapPage/actions';
import messages from './messages';
import { prepareCategories, prepareCategoriesResolved, prepareDates } from './prepareStats';

const geocoder = new google.maps.Geocoder(); // eslint-disable-line no-undef

export class StatsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      bounds: undefined,
      firstLoaded: false,
      currentChart: 'category',
      mapIssues: [],
      address: '',
      firstChart: true,
    };
    this.updateIssues = this.updateIssues.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapIssues.length === 0 && nextProps.MapPage.issues.length > 0) {
      this.setState({ mapIssues:
        nextProps.MapPage.issues.filter((i) => !i.resolved),
      });
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
    const { mapIssues, address, currentChart } = this.state;
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
            <div
              className="mdl-cell mdl-cell--12-col"
              style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}
            >
              <Map
                containerElement={
                  <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative' }} />
                }
                mapElement={<div style={{ height: '100%', width: '100%', position: 'relative' }} />}
                markers={mapIssues}
                heatmapEnabled
                onBoundsChanged={this.handleBoundsChanged}
                onInitMap={this.updateIssues}
              />
            </div>
          </div>

          <RaisedButton
            className="mdl-cell mdl-cell--2-col"
            label={<FormattedMessage {...messages.refreshStats} />}
            labelPosition="before"
            primary
            icon={<ActionRefresh />}
            style={{ margin: 'auto', marginTop: 10, width: 170 }}
            onTouchTap={this.updateIssues}
          />
          {
            issues.length === 0 ?
              <div style={{ marginTop: 30 }}>
                <h4><FormattedMessage {...messages.noDataToDisplay} /></h4>
              </div> :
              <div className="mdl-grid" style={{ maxWidth: 930 }}>
                <div className="mdl-cell mdl-cell--4-col">
                  <h5><b><FormattedMessage {...messages.chooseChart} /></b></h5>

                  <SelectField
                    floatingLabelText={t(messages.chart)}
                    value={currentChart}
                    onChange={(a, b, v) => this.setState({ currentChart: v })}
                    style={{ width: 230, textAlign: 'left' }}
                    selectedMenuItemStyle={{ color: '#888' }}
                  >
                    <MenuItem
                      value="category"
                      primaryText={<FormattedMessage {...messages.byCategory} />}
                    />
                    <MenuItem
                      value="category-resolved"
                      primaryText={<FormattedMessage {...messages.byCategoryResolved} />}
                    />
                    <MenuItem
                      value="date"
                      primaryText={<FormattedMessage {...messages.byDateCategory} />}
                    />
                  </SelectField>
                </div>
                <div className="mdl-cell mdl-cell--8-col">
                  { currentChart === 'category' &&
                    <div>
                      <h4><b><FormattedMessage {...messages.issuesByCategory} /> (%)</b></h4>
                      <Chart
                        chartType="PieChart"
                        data={prepareCategories(t, issues)}
                        options={{
                          backgroundColor: { fill: 'transparent' },
                          chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
                        }}
                        width="100%"
                        style={{ left: '-200px' }}
                        height="450px"

                        legend_toggle
                      />
                    </div> }
                  { currentChart === 'category-resolved' &&
                    <div>
                      <h4><b><FormattedMessage {...messages.issuesByCategoryResolved} /></b></h4>
                      <Chart
                        chartType="ColumnChart"
                        data={prepareCategoriesResolved(t, issues)}
                        options={{
                          backgroundColor: { fill: 'transparent' },
                          // chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
                          legend: { position: 'top', maxLines: 3 },
                          isStacked: true,
                        }}
                        width="100%"
                        style={{ left: '-200px' }}
                        height="450px"

                        legend_toggle
                      />
                    </div> }
                  { currentChart === 'date' &&
                    <div>
                      <h4><b><FormattedMessage {...messages.issuesByDateCategory} /></b></h4>
                      <Chart
                        chartType="LineChart"
                        data={prepareDates(t, issues)}
                        options={{
                          backgroundColor: { fill: 'transparent' },
                          // chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
                        }}
                        width="100%"
                        style={{ left: '-200px' }}
                        height="450px"

                        legend_toggle
                      />
                    </div> }
                </div>
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

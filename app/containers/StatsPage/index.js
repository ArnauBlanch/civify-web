/*
 *
 * StatsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, Toggle } from 'material-ui';
import Helmet from 'react-helmet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Map from '../../components/Map';
import makeSelectStatsPage from './selectors';
import { issuesRequest } from '../MapPage/actions';
import messages from './messages';

export class StatsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { bounds: undefined, firstLoaded: false, fullMap: false };
    this.updateIssues = this.updateIssues.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }

  updateIssues() {
    console.log(this.state.bounds);
    this.props.dispatch(issuesRequest());
  }

  handleBoundsChanged(bounds) {
    this.setState({ bounds: {
      minLat: bounds.f.b,
      maxLat: bounds.f.f,
      minLng: bounds.b.b,
      maxLng: bounds.b.f,
    } });
    if (!this.state.firstLoaded) {
      this.updateIssues();
      this.setState({ firstLoaded: true });
    }
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { issues } = this.props.MapPage;
    const { fullMap } = this.state;
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
          <Toggle
            label={<FormattedMessage {...messages.showCharts} />}
            style={{ width: '200', right: 0 }}
            toggled={!this.state.fullMap}
            onToggle={() => this.setState({ fullMap: !this.state.fullMap })}
          />
          <div className="mdl-grid" style={{ maxWidth: 940 }}>
            <div
              className={`mdl-cell ${!fullMap && 'mdl-cell--6-col'}`}
              style={fullMap ? { width: '100%' } : {}}
            >
              <Map
                containerElement={
                  <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative' }} />
                }
                mapElement={
                  <div style={{ height: '100%', width: '100%', position: 'relative' }} />
                }
                markers={issues}
                heatmapEnabled
                onBoundsChanged={this.handleBoundsChanged}
                onInitMap={this.updateIssues}
                fullMap={fullMap}
              />
            </div>
            <div
              className={`mdl-cell ${!fullMap && 'mdl-cell--6-col'}`}
              style={fullMap ? { display: 'none' } : {}}
            >
              test
            </div>
          </div>
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

/*
 *
 * MapPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import makeSelectMapPage from './selectors';
// import messages from './messages';
import { issuesRequest } from './actions';
import IssueDetails from '../../components/IssueDetails';
import Map from '../../components/Map';
import FilterDialog from '../../components/FilterDialog';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filterOpen: false,
      issue: undefined,
      showIssueFromUrl: typeof this.props.params.issueID !== 'undefined',
      filters: {
        initialStatus: 'unresolved',
        initialRisk: 'all',
        initialCategories: [true, true, true, true, true, true, true, true],
      },
    };
    this.showIssue = this.showIssue.bind(this);
    this.showFilters = this.showFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.filterSubmit = this.filterSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(issuesRequest({ resolved: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { issues } = this.props.mapState;
    const nextIssues = nextProps.mapState.issues;
    if (issues !== nextIssues && this.state.showIssueFromUrl) {
      const issueFromUrl = nextIssues.find((i) => (
        i.issue_auth_token === nextProps.params.issueID)
      );
      if (issueFromUrl) {
        this.setState({ issue: issueFromUrl });
      }
    }
  }

  showIssue(issue) {
    this.setState({ issue });
  }

  showFilters() {
    this.setState({ filterOpen: true });
  }

  closeFilters() {
    this.setState({ filterOpen: false });
  }

  closeDrawer() {
    this.setState({ issue: undefined, showIssueFromUrl: false });
  }

  mapLoaded() {
    this.setState({ loaded: true });
  }

  filterSubmit(status, risk, categories) {
    const filterInfo = {};
    if (status === 'unresolved') filterInfo.resolved = false;
    else if (status === 'resolved') filterInfo.resolved = true;
    if (risk === 'yes') filterInfo.risk = true;
    else if (risk === 'no') filterInfo.risk = false;
    const newCategories = [];
    if (categories[0]) newCategories.push('road_signs');
    if (categories[1]) newCategories.push('illumination');
    if (categories[2]) newCategories.push('grove');
    if (categories[3]) newCategories.push('street_furniture');
    if (categories[4]) newCategories.push('trash_and_cleaning');
    if (categories[5]) newCategories.push('public_transport');
    if (categories[6]) newCategories.push('suggestion');
    if (categories[7]) newCategories.push('other');
    if (newCategories.length > 0 && newCategories.length !== 8) {
      filterInfo.categories = newCategories;
    }
    this.props.dispatch(issuesRequest(filterInfo));
    this.setState({ filterOpen: false });
  }

  render() {
    return (
      <div className="App">
        <Helmet
          title="Civify"
          meta={[
            { name: 'description', content: 'Description of CreateAchievement' },
          ]}
        />
        <FilterDialog
          open={this.state.filterOpen}
          handleClose={this.closeFilters}
          onFilterSubmit={this.filterSubmit}
          risk={this.state.filters.initialRisk}
          status={this.state.filters.initialStatus}
          categories={this.state.filters.initialCategories}
        >
        </FilterDialog>
        <IssueDetails
          toggleDrawer={this.closeDrawer}
          open={typeof this.state.issue !== 'undefined'}
          issue={this.state.issue}
        />
        <Map
          showFilters
          containerElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw', overflow: 'hidden' }} />
          }
          mapElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw', position: 'absolute' }} />
          }
          markers={this.props.mapState.issues}
          onIssueClick={this.showIssue}
          onFabClick={this.showFilters}
          showingIssue={typeof (this.state.issue) !== 'undefined'}
          issueCenter={this.state.issue && { lat: this.state.issue.latitude, lng: this.state.issue.longitude }}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mapState: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapState: makeSelectMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

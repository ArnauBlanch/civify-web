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

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      issue: undefined,
      showIssueFromUrl: typeof this.props.params.issueID !== 'undefined',
    };
    this.showIssue = this.showIssue.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(issuesRequest({}));
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

  closeDrawer() {
    this.setState({ issue: undefined, showIssueFromUrl: false });
  }

  mapLoaded() {
    this.setState({ loaded: true });
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

        <IssueDetails
          toggleDrawer={this.closeDrawer}
          open={typeof this.state.issue !== 'undefined'}
          issue={this.state.issue}
        />
        <Map
          containerElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw', overflow: 'hidden' }} />
          }
          mapElement={
            <div style={{ height: 'calc(100vh - 50px)', width: '100vw', position: 'absolute' }} />
          }
          markers={this.props.mapState.issues}
          onIssueClick={this.showIssue}
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

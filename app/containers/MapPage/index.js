/*
 *
 * MapPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
    this.props.dispatch(issuesRequest());
  }
  findIssueByToken(token) {
    return this.props.mapState.issues.find((i) => i.issue_auth_token === token);
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
    const issueFromUrl = this.props.mapState.issues.find((i) => i.issue_auth_token === this.props.params.issueID);
    return (
      <div className="App">
        <IssueDetails
          toggleDrawer={this.closeDrawer}
          open={this.state.showIssueFromUrl || typeof (this.state.issue) !== 'undefined'}
          issue={this.state.issue || issueFromUrl}
        />
        <Map
          containerElement={
            <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} />
          }
          mapElement={
            <div style={{ height: '100vh', width: '100vw', position: 'absolute' }} />
          }
          markers={this.props.mapState.issues}
          showIssue={this.showIssue}
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

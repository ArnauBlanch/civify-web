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
      loaded: false,
    };
    this.showIssue = this.showIssue.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.dispatch(issuesRequest());
  }
  findIssueByToken(token) {
    return this.props.mapState.issues.filter((issue) => {
      return issue.issue_auth_token === token;
    });
  }
  showIssue(issue) {
    console.log(typeof issue);
    if (typeof issue !== 'object') {
      const issueFound = this.findIssueByToken(issue)[0];
      console.log('Look here baby');
      console.log(issueFound);
      this.setState({ open: true, issueFound });
    } else {
      this.setState({ open: true, issue });
    }
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  mapLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    if (this.props.mapState.issuesLoaded) {
      console.log('I entered here');
      console.log(this.props.params.issueID);
      if (this.props.params.issueID && !this.state.loaded) {
        const token = this.props.params.issueID;
        this.showIssue(token);
        this.mapLoaded();
      }
    }
    return (
      <div className="App">
        <IssueDetails
          toggleDrawer={this.toggleDrawer}
          open={this.state.open}
          issue={this.state.issue}
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

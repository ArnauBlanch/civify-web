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
    };
    this.showIssue = this.showIssue.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.dispatch(issuesRequest());
  }

  showIssue(issue) {
    console.log(issue);
    this.setState({ open: true, issue });
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
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

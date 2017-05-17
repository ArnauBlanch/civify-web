/*
 *
 * MapPage
 *
 */

import React, { PropTypes, Button } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { createStructuredSelector } from 'reselect';
import makeSelectMapPage from './selectors';
// import messages from './messages';
import CustomMarker from '../../components/CustomMarker';
import { issuesRequest } from './actions';
import IssueDetails from '../../components/IssueDetails';

const SimpleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
  >
    {props.markers.map((marker, index) => (
      <li key={index}> {// eslint-disable-line
      }
        <CustomMarker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          category={marker.category}
          onClick={props.toggleDrawer}
        >
        </CustomMarker>
      </li>
    ))}
  </GoogleMap>
));


class MapPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('He tornat');
    this.state = {
      open: false,
      issue: undefined,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.dispatch(issuesRequest());
  }

  toggleDrawer() {
    // io k se arnau esborra el que vulguis d'aqui excepte la primera linia
    this.setState({ open: !this.state.open });
    if (!this.state.open) this.setState({ issue: undefined });
    else {
      console.log('same');
      if (this.state.issue) {
        console.log(this.state.issue);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <IssueDetails
          toggleDrawer={this.toggleDrawer}
          open={this.state.open}
        />
        <SimpleMap
          containerElement={
            <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} />
          }
          mapElement={
            <div style={{ height: '100vh', width: '100vw', position: 'absolute' }} />
          }
          markers={this.props.mapState.issues}
          toggleDrawer={this.toggleDrawer}
          issue={this.state.issue}
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

/**
*
* IssueDetails
*
*/

import React, { PropTypes } from 'react';
import { Drawer, AppBar, MenuItem } from 'material-ui';
import { Link } from 'react-router';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class IssueDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.toggleDrawer}
      >
        <AppBar
          title={'Issue clicada'}
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
        />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MenuItem onTouchTap={this.props.toggleDrawer} >
          </MenuItem>
        </Link>
      </Drawer>
    );
  }
}

IssueDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default IssueDetails;

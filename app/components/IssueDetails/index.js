/**
*
* IssueDetails
*
*/

import React, { PropTypes } from 'react';
import { Drawer } from 'material-ui';
import IssueInformation from '../IssueInformation';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class IssueDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { issue } = this.props; // eslint-disable-line
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        width={400}
        onRequestChange={this.props.toggleDrawer}
      >
        <div style={{ marginTop: 50 }}>
          <IssueInformation />
        </div>
      </Drawer>
    );
  }
}

IssueDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  issue: PropTypes.object,
};

export default IssueDetails;

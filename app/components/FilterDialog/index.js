/**
*
* FilterDialog
*
*/

import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// import styled from 'styled-components';

// import messages from './messages';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioGroupContainer: {
    margin: '0 auto',
    width: '50%',
    textAlign: 'center',
  },
  radioGroup: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '50%',
    margin: '0 auto',
  },
  radioButton: {
    marginBottom: 16,
    width: 'auto',
  },
  title: {
    fontSize: '20px',
    alignSelf: 'center',
  },
  checkbox: {
    marginBottom: 16,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  row: {
    margin: '0 auto',
  },
  container: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  checkboxLabel: {
    fontSize: '18px',
  },
  toggle: {
    marginBottom: 16,
    display: 'block',
  },
};

class FilterDialog extends React.Component {
  constructor(props) {
    super(props);
    // will do something
    this.state = {
      status: 'unresolved',
      risk: 'all',
      categories: [true, true, true, true, false, false, true, false],
    };
    this.state.isToggled = this.isAllSelected();
    this.toggleText = this.toggleText.bind(this);
  }

  toggleText() {
    return this.isToggled ? 'Deselect all' : 'Select all';
}

  isAllSelected() {
    for (let i = 0; i < this.state.categories.size; i += 1) {
      if (!this.state.categories[0]) return false;
    }
    return true;
  }

  render() {
    const { open, handleClose } = this.props;
    const filterActions = [
      <FlatButton
        label="Cancel"
        primary={true} // eslint-disable-line
        onTouchTap={this.closeFilters}
      />,
      <FlatButton
        label="Filter"
        primary={true} // eslint-disable-line
        keyboardFocused={true} // eslint-disable-line
        onTouchTap={this.closeFilters}
      />,
    ];
    return (
      <div style={{ borderColor: 'transparent', textAlign: 'center' }}>
        <Dialog
          title="Filter issues"
          actions={filterActions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
          autoScrollBodyContent={true} // eslint-disable-line
          style={{ borderColor: 'transparent', textAlign: 'center' }}
        >
          <span style={styles.title}>Status</span>
          <RadioButtonGroup name="status" defaultSelected={this.state.status} style={styles.radioGroup}>
            <RadioButton
              value="unresolved"
              label="Unresolved"
              style={styles.radioButton}
            />
            <RadioButton
              value="resolved"
              label="Resolved"
              style={styles.radioButton}
            />
            <RadioButton
              value="all"
              label="All"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <span style={styles.title}>Does it pose a risk?</span>
          <RadioButtonGroup name="risk" defaultSelected={this.state.risk} style={styles.radioGroup}>
            <RadioButton
              value="yes"
              label="Yes"
              style={styles.radioButton}
            />
            <RadioButton
              value="no"
              label="No"
              style={styles.radioButton}
            />
            <RadioButton
              value="all"
              label="All"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <span style={styles.title}>Categories</span>
          <div style={styles.container}>
            <div style={styles.row}>
              <Checkbox
                label="Road signs"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[0]}
              />
              <Checkbox
                label="Illumination"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[1]}
              />
              <Checkbox
                label="Grove"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[2]}
              />
              <Checkbox
                label="Street furniture"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[3]}
              />
            </div>
            <div style={styles.row}>
              <Checkbox
                label="Trash and cleaning"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[4]}
              />
              <Checkbox
                label="Public transport"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[5]}
              />
              <Checkbox
                label="Suggestion"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[6]}
              />
              <Checkbox
                label="Other"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[7]}
              />
            </div>
          </div>
          <Toggle
            label={this.toggleText()}
            defaultToggled={this.state.isToggled}
            labelPosition="left"
            labelStyle={{ marginLeft: '500px' }} // 0 responsive lmao
            style={styles.toggle}
          />
        </Dialog>
      </div>
    );
  }

}

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FilterDialog;

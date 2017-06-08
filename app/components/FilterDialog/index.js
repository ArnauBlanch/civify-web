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
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import messages from './messages';

// import styled from 'styled-components';


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
      status: props.status,
      risk: props.risk,
      categories: props.categories,
      toggled: props.categories.every((x) => x),
    };
    this.toggleText();
    console.log(this.state.toggled);
    console.log(this.state.textToggle);
  }

  toggleText() {
    this.state.textToggle = this.state.toggled ? 'Deselect all' : 'Select all';
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
          title={messages.filterTitle.text}
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
            label={this.state.textToggle}
            defaultToggled={this.state.toggled}
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
  risk: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default FilterDialog;
